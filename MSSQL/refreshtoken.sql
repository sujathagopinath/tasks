create database Token
USE Token
drop table Customers
-----------------------------------------
select * from Customers
-----------------------------------------
create table Customers(
userId int primary key identity(1,1),
name nvarchar(50),
email nvarchar(50),
password nvarchar(MAX),
age int,
refreshtoken nvarchar(MAX)
)
--------------------------------------------
Create proc spSignupUsers
@name nvarchar(50),
@email nvarchar(50),
@password nvarchar(max),
@age int,
@refreshtoken nvarchar(max),
@responseMessage varchar(50) output

as
begin
set nocount on;
begin try


IF EXISTS (Select email from Customers where email = @email)
BEGIN
set @responseMessage = 'Failed';
END
ELSE
BEGIN
Insert into Customers
Output Inserted.userId,@name as Name , @email as Email,@password as Password,@age as age,@refreshtoken as refreshtoken
values(@name, @email,@password,@age,@refreshtoken);

set @responseMessage = 'Success';
END

end try
begin catch
set @responseMessage = ERROR_MESSAGE();
end catch
end
-------------------------------------------------------

Create proc spSignInUsers
@email nvarchar(50),
@password nvarchar(max),
@refreshtoken nvarchar(max),
@responseMessage varchar(50) output

as
begin
set nocount on;
begin try
IF EXISTS (Select email,password from Customers where email = @email and password = @password)
begin
Select email,password from Customers where email = @email and password = @password
update Customers set refreshtoken = @refreshtoken where email = @email
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