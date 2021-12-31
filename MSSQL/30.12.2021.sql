USE CRUD
Drop table Users
Drop table Products

create table Users(
Name varchar(30),
EmailId varchar(30) Unique,
Password varchar(50)
)

 set identity_insert Users off;

 set identity_insert Users on;

create table Products(
Pk_Product_Id INT PRIMARY KEY,
ProductName     VARCHAR(255),
Price  INT,
ProductDes Varchar(200),
Fk_User_Id   INT FOREIGN KEY REFERENCES Users(pk_user_Id)
)

CREATE procedure AddUser
(
@Name varchar(30),
@EmailId varchar(30),
@Password varchar(30)
)
as begin
Insert into Users
(Name,EmailId,Password)
values
(@Name,@EmailId,@password);
end

select * from Users

CREATE TABLE Person (
  id int PRIMARY KEY NOT NULL,
  first_name varchar(30) DEFAULT NULL,
  last_name varchar(30) DEFAULT NULL,
  gender varchar(10) DEFAULT NULL,
  Emailid varchar(50) DEFAULT NULL,
  password varchar(20) DEFAULT NULL,
) 

CREATE TYPE dbo.inventoryRequestType AS TABLE
    (
    ItemNo int NULL,
	ProductName varchar(50) NULL,
	ProductDescription varchar(50) NULL,
    Qty int NULL,
    Price int NULL
    )

	CREATE PROCEDURE [dbo].[create_purchasing_list]
    -- Add the parameters for the stored procedure here
    @purchaseList inventoryRequestType READONLY

AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO [Inventory Requests]
        (
        ItemNo,
		ProductName,
		ProductDescription,
        Qty,
		Price
        )
    SELECT
        ItemNo,
       ProductName,
		ProductDescription,
        Qty,
		Price
        
    FROM @purchaseList
END

create table Member(
username varchar(30),
password varchar(30)
)

CREATE PROCEDURE LoginMember @Username varchar(11), @Password char(64)
AS
BEGIN
   Select * from Member
   WHERE Member.username = @Username AND Member.password = @Password
END

Exec LoginMember 


select * from Person

CREATE TYPE [dbo].[Tvp_Login] AS TABLE(  
[Name] [varchar](50) NULL,  
[Email] [varchar](50) NULL  
)  
GO  

Create PROCEDURE [dbo].[Proc_insertuser] (@tbl_Login TVP_LOGIN readonly)  
AS  
BEGIN  
BEGIN try  
-- Insert statements for procedure here  
INSERT INTO tbl_login  
(NAME,  
Email)  
SELECT NAME,  
Email  
FROM @tbl_Login  
Select 1 as 'Code', 'Inserted Successfuly.' as 'Message'  
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

create table login(
name varchar(50),
email varchar(50),
password varchar(50)
)

drop table login

CREATE procedure [dbo].[Insertloginuser]  
(  
@name varchar(50),  
@email varchar(50),  
@password varchar(50)  
)  
AS  
BEGIN  
insert into login (name,email,password) values( @name, @email, @password)  
END  

EXEC Insertloginuser sujatha,sujatha,sujatha

select * from Login



























