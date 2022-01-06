use loginSignup

create procedure spinProducts
@userEmail nvarchar(50),
@productname varchar(50),
@price int,
@responseMessage varchar(50) output

as
begin
set nocount on;
insert into signupUser (userEmail) values (@userEmail) 
declare @id int
select @id = SCOPE_IDENTITY()

insert into Products
Output Inserted.productId,@id as custId,@productname as productname,@price as price
values(@id,@productname,@price);

END

select * from Products
select * from signupUser

create procedure spProductin

@productname nvarchar(50),
@price int,
@responseMessage varchar(50) output

as
begin
set nocount on;
begin try

IF EXISTS (Select productname from Products where productname = @productname)
BEGIN
set @responseMessage = 'Failed';
END
ELSE
BEGIN

declare @id int
select @id = SCOPE_IDENTITY()

insert into Products
Output Inserted.productId,@id as custId,@productname as productname,@price as price
values(@id,@productname,@price);

set @responseMessage = 'Success';
END
end try
begin catch
set @responseMessage = ERROR_MESSAGE();
end catch
end