CREATE TYPE [dbo].[EmployeeType] AS TABLE(
	[Code] [varchar](50) NOT NULL,
	[Name] [varchar](50) NULL,
	[Job] [varchar](50) NULL,
	[Salary] [int] NULL,
	[Department] [varchar](50) NULL
)
GO

insert into Employee values('101','akhshy','developer',25000,'development')

CREATE PROCEDURE [dbo].[AddEmployees]
	@Employees EmployeeType READONLY
AS
BEGIN
	DECLARE @lastCode INT;

	SET @lastCode = (SELECT MAX(Code) AS LastCode FROM Employee);

	INSERT INTO Employee (Code, [Name], Job, Salary, Department)
	SELECT * FROM @Employees;

	SELECT * FROM Employee WHERE Code > @lastCode;
END
GO

create table Users(
Id int,
Name NVarChar, 
Age Int,
Emailid NVarChar,
Phoneno NVarChar
)

create table customer(
cust_name varchar(20),
states varchar(20),
email varchar(20)
)

insert into customer(cust_name,states,email)
values ('aaa','texas','abc@gmail.com'),
('bbb','california','xyz@gmail.com'),
('ccc','newyork','pqr@gmail.com'),
('ddd','florida','asd@gmail.com'),
('eee','california','qwe@gmail.com')

select * from customer

CREATE PROCEDURE GetDataFromCustomer(@states varchar(20))
AS
BEGIN 
	select cust_name,email,states
	from customer
	where states = @states
END

EXEC GetDataFromCustomer 'california'

create PROCEDURE InsertUsers




