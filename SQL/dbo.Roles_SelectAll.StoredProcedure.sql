USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Roles_SelectAll]    Script Date: 10/23/2022 10:33:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- Code Reviewer:


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[Roles_SelectAll]

/*

		EXECUTE dbo.Roles_SelectAll 

*/

as


BEGIN

			SELECT [Id]
				  ,[Name]
			  FROM [dbo].[Roles]

			ORDER BY Id

END
GO
