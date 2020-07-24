SET IDENTITY_INSERT [UserType] ON
INSERT INTO [UserType]
  ([Id], [Type])
VALUES 
  (1, 'admin'), 
  (2, 'user');
SET IDENTITY_INSERT [UserType] OFF

SET IDENTITY_INSERT [Organization] ON
INSERT INTO [Organization]
  ([Id], [Name], [OrgUID])
VALUES 
  (1, 'Best Ever', 'AbCdE'); 

SET IDENTITY_INSERT [Organization] OFF

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile] 
([Id], [FirstName], [LastName], [Email], [FirebaseUserId], [OrganizationId], [UserTypeId])
VALUES 
(1, 'Derek', 'Buckley', 'derek@email.com', '8o2xMQwdorOoHdeXLQ9zc50MZ6D3', 1, 1),
(2, 'Rena', 'Buckley', 'rena@email.com', 'lHAHjPerHGZ1rma3NLCiGXxBj2f1', 1, 1);
SET IDENTITY_INSERT [UserProfile] OFF
