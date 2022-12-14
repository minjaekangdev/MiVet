USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectAll]    Script Date: 10/23/2022 10:33:21 AM ******/
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

CREATE PROC [dbo].[Users_SelectAll]
								@PageIndex int
								,@PageSize int								
								

as 

/*

DECLARE
		@PageIndex int = 0
		,@PageSize int = 3

EXECUTE 
		dbo.Users_SelectAll
							@PageIndex
							,@PageSize

*/

BEGIN 

			DECLARE @offset int = @PageIndex * @PageSize

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
				  ,TotalCount = COUNT(1) OVER()
			  FROM [dbo].[Users]

			  ORDER BY [Id]
				
					OFFSET @offset ROWS
					FETCH NEXT @PageSize ROWS ONLY

END

GO
