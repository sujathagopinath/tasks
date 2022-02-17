Create database Eproducts

use Eproducts

exec sp_changedbowner 'sa', 'true'
select name, hasdbaccess from sys.sysusers where name = 'guest'

grant connect to guest
-------------------------------------------
select * from Users
select * from Products
select * from carts
select * from orders

Drop table Users
--------------------------------------------
CREATE SERVER ROLE admins AUTHORIZATION serveradmin;
--------------------------------------------
Create table Users(
userId int primary key identity(1,1),
userName varchar(50),
userEmail nvarchar(50),
userPassword nvarchar(max),
role varchar(10),
verified BIT,
emailToken nvarchar(max)
);

----------------------------------------------
create procedure spverifys
@emailToken nvarchar(max),
@verified int = '1',
@responseMessage nvarchar(50) output

as 
BEGIN
set nocount on;
begin try
IF EXISTS (Select emailToken from Users where emailToken = @emailToken)
begin
update Users set verified = @verified where emailToken = @emailToken
end
else
begin
set @responseMessage = 'Auth Failed';
end
end try
begin catch
set @responseMessage = ERROR_MESSAGE();
end catch
END
----------------------------------------------
create procedure spresend
@userEmail nvarchar(50),
@emailToken nvarchar(max),
@verified int,
@responseMessage nvarchar(50) output
as 
BEGIN
set nocount on;
IF EXISTS (Select userEmail from Users where userEmail = @userEmail)
begin
if(@@ROWCOUNT =0)
begin
update Users set emailToken = @emailToken,verified=@verified where userEmail = @userEmail
set @responseMessage ='sent';
end
END
else
set @responseMessage = 'Invalid Email';
END


-----------------------------------------------
create procedure spverified
@userEmail nvarchar(50),
@verified BIT,
@responseMessage nvarchar(50) output
as 
BEGIN
set nocount on;
IF EXISTS (Select userEmail from Users where userEmail = @userEmail)
begin
SELECT verified =  
CASE
    WHEN @verified = 1  THEN 'success'
	WHEN @verified = 0  THEN 'Verify the email'
    ELSE 'check email and login'
END
FROM Users
END
set @responseMessage = ERROR_MESSAGE();
END

----------------------------------------------
Create proc spSignupUsers
@userName varchar(50),
@userEmail nvarchar(50),
@userPassword nvarchar(max),
@verified int,
@role varchar(10) ='USER',
@emailToken nvarchar(max),
@responseMessage varchar(50) output

as
begin
set nocount on;
begin try


IF EXISTS (Select userEmail from Users where userEmail = @userEmail)
BEGIN
set @responseMessage = 'Failed';
END
ELSE
BEGIN
Insert into Users
Output Inserted.userId,@userName as Name , @userEmail as Email,@userPassword as Password,@role as role,
@verified as verified,@emailToken as emailToken
values(@username, @userEmail,@userPassword,@role,@verified,@emailToken);

set @responseMessage = 'Success';
END

end try
begin catch
set @responseMessage = ERROR_MESSAGE();
end catch
EXEC sys.sp_addrolemember 'Admin', 'tu78599@gmail.com'
end

------------------------------------------------------------

Create proc spSignInUser
@userEmail nvarchar(50),
@userPassword nvarchar(max),
@responseMessage varchar(50) output

as
begin
set nocount on;
begin try
IF EXISTS (Select userEmail,userPassword from Users where userEmail = @userEmail and userPassword = @userPassword)
begin
Select userEmail,userPassword from Users where userEmail = @userEmail and userPassword = @userPassword
set @responseMessage = 'Success';
end
else
begin
set @responseMessage = 'Auth Failed';
end
end try

begin catch
set @responseMessage = 'Failed'
end catch
end

--------------------------------------------------------------------------

CREATE PROCEDURE spUpdateuser
@userId int,
@userName varchar(50),
@userEmail nvarchar(50),
@userPassword nvarchar(max),
@responseMessage varchar(50) output

AS
BEGIN
set nocount on;
update Users set userName = @userName, userEmail = @userEmail, userPassword = @userPassword where userId = @userId
end
if(@@ROWCOUNT>0)
begin
set @responseMessage = 'Updated user profile';
end
else
begin
set @responseMessage = 'No user profile found';
end

------------------------------------------------------------------

create procedure spgetuserdata
@userId int,
@userName nvarchar(50),
@userEmail nvarchar(50),
@responseMessage varchar(50) output

AS
BEGIN
SET nocount on;
begin try
SELECT * FROM Users RIGHT JOIN Products ON  Users.userId = Products.custId 
where Users.userId = @userId

set @responseMessage = 'Success';
end try
begin catch
set @responseMessage = ERROR_MESSAGE();
end catch
END
------------------------------------------------------------------
CREATE TABLE Products (
    productId int primary key identity(1,1),
    productname nvarchar(50),
	productnote nvarchar(50),
	quantity int Default '1',
	price int,
	discount int Default '0',
	productimage nvarchar(50),
    custId int FOREIGN KEY REFERENCES users(userId)
);

--------------------------------------------------------------------

create procedure spProductcreate
@productname nvarchar(50),
@productnote nvarchar(50),
@quantity int ='1',
@price int,
@discount int ='0',
@productimage nvarchar(50),
@custId int,
@responseMessage varchar(50) output
AS
begin
set nocount on;
begin try
Insert into Products
Output Inserted.productId,@productname as productname,@productnote as productnote,
@quantity as quantity,@price as price,@discount as discount, @productimage as productname,
@custId as custId
values(@productname,@productnote,@quantity,@price,@discount,@productimage,@custId);

SELECT Products.productname, Products.price
FROM Products
INNER JOIN users ON users.userId = Products.custId

set @responseMessage = 'success'
end try

begin catch
set @responseMessage = ERROR_MESSAGE();
end catch

end
----------------------------------------------------------

create procedure spdel    ---product and user will also delete
@params int
AS
BEGIN
set nocount on;
delete from Products where productId = @params;

END

------------------------------------------------------------
create proc spupdateproducts
@productId int,
@productname nvarchar(50),
@productnote nvarchar(50),
@price int ,
@discount int,
@responseMessage varchar(50) output

AS
BEGIN
set nocount on;
IF (@price >= 1000)
BEGIN
set @Discount = @price - @discount
update Products set productname = @productname, productnote = @productnote,price=@price, discount = @Discount where productId = @productId
if(@@ROWCOUNT>0)
begin
set @responseMessage = 'Updated Products';
end 
End 

ELSE 
BEGIN
set @Discount = @price
update Products set productname = @productname, productnote = @productnote,price=@price, discount = @Discount where productId = @productId
set @responseMessage = 'Product Not Updated'
END
END
----------------------------------------------------------------------
create table carts(
productId int,
productname nvarchar(50),
discount int,
quantity int,
total int,
userId int FOREIGN KEY REFERENCES users(userId)
)

---------------------------------------------------------------------
CREATE PROCEDURE spitem
@productId int,
@productname nvarchar(50),
@discount int,
@quantity int,
@total int,
@userId int
    
AS BEGIN
SET NOCOUNT ON;
SELECT ProductId,productname,discount,quantity FROM Products RIGHT JOIN Users ON  Users.userId = Products.custId 
where Users.userId = @userId
set @total = @quantity *@discount
           
INSERT INTO carts(productId,productname,discount,quantity,total,userId) 
VALUES (@productId,@productname,@discount,@quantity, @total,@userId)
END

-------------------------------------------------------------------
create procedure spcartdelete    
@params int
AS
BEGIN
set nocount on;
delete from carts where productId = @params;

END
---------------------------------------------------------------------
create table orders(
orderId int  primary key identity(1,1),
usersId int FOREIGN KEY REFERENCES users(userId),
productsId int FOREIGN KEY REFERENCES Products(productId),
item nvarchar(50)
)
------------------------------------------------------------------------
create procedure sporder
@usersId int,
@productId int,
@productname nvarchar(50)
AS
BEGIN
set nocount on
SELECT Products.productname,Products.productId
FROM Products RIGHT JOIN Users On Users.userId = Products.custId
Where Products.ProductId = @productId

INSERT INTO orders(usersId,productsId,item) 
VALUES (@usersId,@productId,@productname)
END

--------------------------------------------------------------------
create procedure sppromote
@userId int,
@role varchar(10),
@responseMessage varchar(50) output
AS
BEGIN
set nocount on
if(@userId= @userId)
set @responseMessage ='Admin cannot change their own type'
else
begin
update Users set role = @role where userId = @userId
set @responseMessage = 'User role updated'
END
END



