USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Users_UpdateStatus]    Script Date: 10/23/2022 10:33:21 AM ******/
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

CREATE PROC [dbo].[Users_UpdateStatus]
									@Id int
									,@StatusTypeId int

/*
	DECLARE @Id int = 35

	EXECUTE dbo.Users_SelectById 
								@Id

	DECLARE @StatusTypeId int = 3

	EXECUTE dbo.Users_UpdateStatus 
								@Id
								,@StatusTypeId

	EXECUTE dbo.Users_SelectById
								@Id

*/

as

BEGIN

			UPDATE [dbo].[Users]
			   SET 
				  [StatusTypeId] = @StatusTypeId
				  ,[DateModified] = GETUTCDATE()
			 WHERE Id = @Id

END


GO
