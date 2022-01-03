use foo_db

CREATE TYPE [dbo].[TVP_Employee] AS TABLE(  
[Code] [int] NULL,
[Name] [varchar](50) NULL, 
[Job] [varchar](50) NULL, 
[Salary] [numeric](18, 0) NULL,
[Department] [varchar](50) NULL
)  
 
 CREATE TYPE [dbo].[Tvp_Employees] AS TABLE(  
[Name] [varchar](50) NULL,  
[Salary] [numeric](18, 0) NULL  
)  

create table tbl_employee(
Name varchar(50),
Salary numeric(18,0)
)

drop table tbl_employee

Create PROCEDURE [dbo].[Proc_insertemployee] (@tbl_Employee TVP_EMPLOYEES readonly)  
AS  
BEGIN  
BEGIN try  
-- Insert statements for procedure here  
INSERT INTO tbl_employee  
(NAME,  
salary)  
SELECT NAME,  
salary  
FROM @tbl_Employee  
----Select 1 as 'Code', 'Inserted Successfuly.' as 'Message'  
END try  
BEGIN catch  
DECLARE @ErrorNumber INT  
DECLARE @ErrorMessage VARCHAR(2000)  
DECLARE @ErrorSeverity INT  
DECLARE @ErrorState INT  
SELECT @ErrorNumber = Error_number(),  
@ErrorMessage = 'Error occured at time of inserting'  
+ Error_message(),  
@Errorseverity = Error_severity(),  
@ErrorState = Error_state()  
RAISERROR (@Errormessage,@ErrorSeverity,@ErrorState)  
END catch  
END  
 

EXEC Proc_insertemployee

select * from tbl_employee
