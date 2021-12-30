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











