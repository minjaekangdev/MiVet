USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Users_Select_AuthData]    Script Date: 10/23/2022 10:33:21 AM ******/
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

CREATE PROC [dbo].[Users_Select_AuthData]
									@Email nvarchar(255)

/*

		DECLARE @Email nvarchar(255) = 'testagain1234@email.com'

		EXECUTE dbo.Users_Select_AuthData 
										@Email

*/

as

BEGIN

			SELECT 
					u.[Id]
				  ,u.[Email]
				  ,u.[Password]
				  ,Roles = (SELECT	
									r.Name
							FROM dbo.Roles as r inner join dbo.UserRoles as ur
										on r.Id = ur.RoleId
										Where u.[Id] = ur.UserId
							FOR JSON AUTO
							)

			  FROM [dbo].[Users] as u
			  WHERE Email = @Email 
					AND IsConfirmed = 1
					AND StatusTypeId = 1

END
GO
