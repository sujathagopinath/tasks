create database foo_db

use foo_db

create table Users(name varchar(20),
Age int
)

insert into Users values ('sujatha',25)('Akhshy',21)

CREATE TABLE [dbo].[Employee](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [varchar](50) NOT NULL,
	[Name] [varchar](50) NULL,
	[Job] [varchar](50) NULL,
	[Salary] [int] NULL,
	[Department] [varchar](50) NULL,
 CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

SET IDENTITY_INSERT [dbo].[Employee] OFF

drop table Employee

CREATE TYPE [dbo].[EmployeeType] AS TABLE(
	[Code] [varchar](50) NOT NULL,
	[Name] [varchar](50) NULL,
	[Job] [varchar](50) NULL,
	[Salary] [int] NULL,
	[Department] [varchar](50) NULL
)

INSERT [dbo].[Employee] ([Id], [Code], [Name], [Job], [Salary], [Department]) VALUES (1, N'CT7207', N'Bently Smith', N'Manager', 40000, N'Operations')
INSERT [dbo].[Employee] ([Id], [Code], [Name], [Job], [Salary], [Department]) VALUES (2, N'CT7210', N'Isla Morris', N'Director', 80000, N'Operations')
INSERT [dbo].[Employee] ([Id], [Code], [Name], [Job], [Salary], [Department]) VALUES (3, N'CT7202', N'Allen Green', N'Salesman', 15000, N'Sales')
INSERT [dbo].[Employee] ([Id], [Code], [Name], [Job], [Salary], [Department]) VALUES (4, N'CT7208', N'Xavier Campbell', N'Analyst', 50000, N'Research')
INSERT [dbo].[Employee] ([Id], [Code], [Name], [Job], [Salary], [Department]) VALUES (5, N'CT7209', N'Ethan Kumar', N'Analyst', 50000, N'Research')

CREATE PROCEDURE [dbo].[AddEmployees]
	@Employees EmployeeType READONLY
AS
BEGIN
	DECLARE @lastId INT;

	SET @lastId = (SELECT MAX(Id) AS LastId FROM Employee);

	INSERT INTO Employee (Code, [Name], Job, Salary, Department)
	SELECT * FROM @Employees;

	SELECT * FROM Employee WHERE Id > @lastId;
END

EXEC AddEmployees

select * from Employee










