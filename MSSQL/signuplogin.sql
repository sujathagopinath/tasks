Create database loginSignup

use loginSignup
-------------------------------------------
select * from signupUser
select * from Products
--------------------------------------------

Create table signupUser(
userId int primary key identity(1,1),
userEmail nvarchar(50),
userPassword nvarchar(max)
);

----------------------------------------------

Create proc spSignupUser
@userEmail nvarchar(50),
@userPassword nvarchar(max),
@responseMessage varchar(50) output

as
begin
set nocount on;

begin try

IF EXISTS (Select userEmail from signupUser where userEmail = @userEmail)
BEGIN
set @responseMessage = 'Failed';
END
ELSE
BEGIN
Insert into signupUser
Output Inserted.userId,@userEmail as Email,@userPassword as Password
values(@userEmail,@userPassword);

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
IF EXISTS (Select userEmail,userPassword from signupUser where userEmail = @userEmail and userPassword = @userPassword)
begin
Select userEmail,userPassword from signupUser where userEmail = @userEmail and userPassword = @userPassword
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
@userEmail nvarchar(50),
@userPassword nvarchar(max),
@responseMessage varchar(50) output

AS
BEGIN
set nocount on;
update signupUser set userEmail = @userEmail, userPassword = @userPassword where userId = @userId
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

CREATE TABLE Products (
    productId int primary key identity(1,1),
    productname nvarchar(50),
	price int,
    custId int FOREIGN KEY REFERENCES signupUser(userId)
);

--------------------------------------------------------------------

create procedure spProductcreate
@productname nvarchar(50),
@price int,
@custId int,
@responseMessage varchar(50) output
AS
begin
set nocount on;
begin try
Insert into Products
Output Inserted.productId,@productname as productname,@price as price,@custId as custId
values(@productname,@price,@custId);

SELECT Products.productname, Products.price
FROM Products
INNER JOIN signupUser ON signupUser.userId = Products.custId

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
delete from signupUser where userId = @userId
END

------------------------------------------------------------













