USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectById]    Script Date: 10/23/2022 10:33:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- Code Reviewer: Cayden Burns


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[Users_SelectById]
								@Id int

as 

/*

SELECT *
FROM dbo.Users

DECLARE @Id int = 35

EXECUTE dbo.Users_SelectById @Id

*/

BEGIN 



		SELECT [Id]
				,[Email]
				,[Title]
				,[FirstName]
				,[LastName]
				,[Mi]
				,[AvatarUrl]
				,[IsConfirmed]
				,[StatusTypeId]
				,[DateCreated]
				,[DateModified]
				FROM dbo.Users
		  WHERE Id = @Id
				AND 
				IsConfirmed = 1


END

GO
