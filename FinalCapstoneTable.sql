USE [master]
GO

IF db_id('FinalCapstone') IS NULL
  CREATE DATABASE FinalCapstone
GO

USE [FinalCapstone]
GO



DROP TABLE IF EXISTS [Sales]
DROP TABLE IF EXISTS [Product];
DROP TABLE IF EXISTS [AppointmentSession];
DROP TABLE IF EXISTS [CallSession];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [Organization];
GO 

CREATE TABLE [Organization] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [OrgUID] nvarchar(5) NOT NULL
)
GO

CREATE TABLE [UserType] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [Type] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [UserProfile] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [FirstName] nvarchar(25) NOT NULL,
  [LastName] nvarchar(25) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirebaseUserId] nvarchar(28) NOT NULL,
  [OrganizationId] integer NOT NULL,
  [UserTypeId] integer NOT NULL,

    CONSTRAINT FK_UserProfile_UserType FOREIGN KEY (UserTypeId) REFERENCES UserType(Id),
     CONSTRAINT FK_UserProfile_Orgnaization FOREIGN KEY (OrganizationId) REFERENCES Organization(Id),
  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
GO

CREATE TABLE [CallSession] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [Calls] integer NOT NULL,
  [Contacts] integer NOT NULL,
  [AppontmentsBooked] integer NOT NULL,
  [Date] nvarchar(255) NOT NULL,
  [UserProfileId] integer NOT NULL,

  CONSTRAINT FK_CallSession_UserProfile FOREIGN KEY (UserProfileId) REFERENCES UserProfile(Id)
)
GO

CREATE TABLE [AppointmentSession] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [AppointmentsKept] integer NOT NULL,
  [Presentations] integer NOT NULL,
  [Sales] integer NOT NULL,
  [Date] nvarchar(255) NOT NULL,
  [UserProfileId] integer NOT NULL,

  CONSTRAINT FK_AppointmentSession_UserProfile FOREIGN KEY (UserProfileId) REFERENCES UserProfile(id)
)
GO

CREATE TABLE [Product] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [ProductName] nvarchar(255) NOT NULL,
  [OrganizationId] integer NOT NULL,

   CONSTRAINT FK_Product_Organization FOREIGN KEY (OrganizationId) REFERENCES Organization(id),
)
GO

CREATE TABLE [Sales] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [ProductId] integer NOT NULL,
  [Commission] integer NOT NULL,
  [Date] nvarchar(255) NOT NULL,
  [Closes] integer NOT NULL,
  [UserProfileId] integer NOT NULL,

  CONSTRAINT FK_Sales_UserProfile FOREIGN KEY (UserProfileId) REFERENCES UserProfile(id),
  CONSTRAINT FK_Sales_Product FOREIGN KEY (ProductId) REFERENCES Product(id)
)
GO

