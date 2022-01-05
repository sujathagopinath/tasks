use loginSignup


CREATE TABLE Products (
    productId int primary key identity(1,1),
    productname nvarchar(50),
	price int,
    custId int FOREIGN KEY REFERENCES signupUser(userId)
);