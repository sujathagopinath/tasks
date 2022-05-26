create database backendhapi
------------------------------------
use backendhapi
-------------------------------------
Create table Customers(
custId int primary key identity(1,1),
custName varchar(50),
custEmail nvarchar(50),
custPassword nvarchar(max),
collections varchar(50)
);
-------------------------------------------------
select * from Customers
------------------------------------------------
create procedure spsignupcustomers
@custName varchar(50),
@custEmail nvarchar(50),
@custPassword nvarchar(max),
@collections nvarchar(50),
@responseMessage varchar(50) output

as
begin
set nocount on;
begin try


IF EXISTS (Select custEmail from Customers where custEmail = @custEmail)
BEGIN
set @responseMessage = 'Failed';
END
ELSE
BEGIN
Insert into Customers
Output Inserted.custId,@custName as Name , @custEmail as Email,@custPassword as Password,@collections as Collections
values(@custName, @custEmail,@custPassword,@collections);

set @responseMessage = 'Success';
END
end try
begin catch
set @responseMessage = ERROR_MESSAGE();
end catch
end
-------------------------------------------------------------------

Create procedure spcustlogin
@custEmail nvarchar(50),
@custPassword nvarchar(max),
@responseMessage varchar(50) output

as
begin
set nocount on;
begin try
IF EXISTS (Select custEmail,custPassword from Customers where custEmail = @custEmail and custPassword = @custPassword)
begin
Select custEmail,custPassword from Customers where custEmail = @custEmail and custPassword = @custPassword
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

----------------------------------------------------------------------
create procedure spgetcustdatas
@custId int,
@custName nvarchar(50),
@custEmail nvarchar(50),
@responseMessage varchar(50) output

AS
BEGIN
SET nocount on;
begin try
SELECT * FROM Customers 
where Customers.custId = @custId

set @responseMessage = 'Failed';
end try
begin catch
set @responseMessage = ERROR_MESSAGE();
end catch
END
-------------------------------------------------------------------------
