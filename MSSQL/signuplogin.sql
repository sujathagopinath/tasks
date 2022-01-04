Create database loginSignup

use loginSignup

Create table signupUser(
userId int primary key identity(1,1),
userEmail nvarchar(50),
userPassword nvarchar(max)
);

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


select * from signupUser

create procedure  spUpdateusers
@userId int,
@userEmail nvarchar(50),
@userPassword nvarchar(max),
@responseMessage varchar(50) output

AS
BEGIN
set nocount on;
update signupUser set userEmail = @userEmail, userPassword = @userPassword where userId = @userId
set @responseMessage = 'Success';
END










