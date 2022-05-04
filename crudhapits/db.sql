use newtest

create table employees(
empid int primary key identity(1,1),
designation varchar(20),
empname varchar(25),
age int
)

Create proc spaddEmployee
@empname varchar(50),
@designation nvarchar(50),
@age Int,
@responseMessage varchar(50) output

as
begin
set nocount on;
begin try

Insert into employees
Output Inserted.empId,@empname as EmpName , @designation as Designation,@age as Age
values(@empname, @designation,@age);

set @responseMessage = 'Success';
END

end try
begin catch
set @responseMessage = ERROR_MESSAGE();
end catch
end