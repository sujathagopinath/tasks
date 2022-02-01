Create database Eproducts

use Eproducts
-------------------------------------------
select * from Users
select * from Products
select * from carts
select * from orders

--------------------------------------------

Create table Users(
userId int primary key identity(1,1),
userName varchar(50),
userEmail nvarchar(50),
userPassword nvarchar(max),
isAdmin BIT
);

----------------------------------------------

Create proc spSignupUser
@userName varchar(50),
@userEmail nvarchar(50),
@userPassword nvarchar(max),
@isAdmin int,
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
Output Inserted.userId,@userName as Name , @userEmail as Email,@userPassword as Password,@isAdmin as isAdmin
values(@username, @userEmail,@userPassword,@isAdmin);

set @responseMessage = 'Success';
END
end try
begin catch
set @responseMessage = ERROR_MESSAGE();
end catch
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
@custId int,
@responseMessage varchar(50) output
AS
begin
set nocount on;
begin try
Insert into Products
Output Inserted.productId,@productname as productname,@productnote as productnote,
@quantity as quantity,@price as price,@discount as discount, @custId as custId
values(@productname,@productnote,@quantity,@price,@discount,@custId);

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




