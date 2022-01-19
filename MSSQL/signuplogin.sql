Create database Backend

use Backend
-------------------------------------------
select * from Users
select * from Products

Drop table Users
--------------------------------------------

Create table Users(
userId int primary key identity(1,1),
userName varchar(50),
userEmail nvarchar(50),
userPassword nvarchar(max)
);

----------------------------------------------

Create proc spSignupUser
@userName varchar(50),
@userEmail nvarchar(50),
@userPassword nvarchar(max),
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
Output Inserted.userId,@userName as Name , @userEmail as Email,@userPassword as Password
values(@username, @userEmail,@userPassword);

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
create procedure spfetchusers
@userId int,
@userName nvarchar(50),
@userEmail nvarchar(50),
@responseMessage varchar(50) output

AS
BEGIN
SET nocount on;
begin try
select Products.productname, Products.price,Products.productnote,Products.Discount,
Users.userName,Users.userEmail from Products,Users
where Users.userId = Products.custId
set @responseMessage = 'Success';
end try
begin catch
set @responseMessage = ERROR_MESSAGE();
end catch
END
-------------------------------------------------------------------
CREATE TABLE Products (
    productId int primary key identity(1,1),
    productname nvarchar(50),
	productnote nvarchar(50),
	price int,
	Discount int Default '0',
    custId int FOREIGN KEY REFERENCES users(userId)
);

--------------------------------------------------------------------

create procedure spProductcreate
@productname nvarchar(50),
@productnote nvarchar(50),
@price int,
@Discount int ='0',
@custId int,
@responseMessage varchar(50) output
AS
begin
set nocount on;
begin try
Insert into Products
Output Inserted.productId,@productname as productname,@productnote as productnote,
@price as price,@Discount as Discount, @custId as custId
values(@productname,@productnote,@price,@Discount,@custId);

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

create procedure spdeleted    ---product and user will also delete
@userId int,
@params int
AS
BEGIN
set nocount on;
delete from Products where custId = @userId;
delete from users where userId = @userId
END

------------------------------------------------------------
create proc spupdateproducts
@productId int,
@productname nvarchar(50),
@productnote nvarchar(50),
@price int ,
@Discount int,
@responseMessage varchar(50) output

AS
BEGIN
set nocount on;
IF (@price >= 1000)
BEGIN
set @discount = @price - 500
update Products set productname = @productname, productnote = @productnote,price=@price, discount = @discount where productId = @productId
if(@@ROWCOUNT>0)
begin
set @responseMessage = 'Updated Products';
end
End 

ELSE 
BEGIN
set @discount = 0
update Products set productname = @productname, productnote = @productnote,price=@price, discount = @discount where productId = @productId
set @responseMessage = 'Product Not Updated'
END
END











