"use client";
import Link from "next/link";
import * as React from "react";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import { pages } from "@/app/_data/pages";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Box, Container, IconButton } from "@mui/material";

const styles = {
	appBar: {
		padding: "10px 0 10px 0",
		backgroundColor: "#fff",
	},
	pageButton: {
		color: "#2a2d39",
		display: "block",
		textTransform: "none",
		marginRight: "20px",
		fontSize: "16px",
		position: "relative",
		"&::after": {
			content: "''",
			position: "absolute",
			width: "100%",
			height: "2px",
			backgroundColor: "#2a2d39",
			bottom: 0,
			left: 0,
			transform: "scaleX(0)",
			transformOrigin: "left",
			transition: "transform 0.3s ",
		},
		"&:hover::after": {
			transform: "scaleX(1)",
		},
	},
	menuBox: {
		display: { xs: "flex", md: "none" },
		justifyContent: "flex-end",
	},
	menu: {
		display: { xs: "block", md: "none" },
	},
	pageBox: {
		display: { xs: "none", md: "flex" },
		width: "100%",
	},
};

const NavBar: React.FC = () => {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) =>
		setAnchorElNav(event.currentTarget);
	const handleCloseNavMenu = () => setAnchorElNav(null);

	return (
		<AppBar position="static" sx={styles.appBar}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={styles.pageBox}>
						{pages.map((page) => (
							<Button key={page.name} href={page.href} sx={styles.pageButton}>
								{page.name}
							</Button>
						))}
					</Box>

					<Box sx={styles.menuBox}>
						<IconButton
							size="large"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
							data-testid="menu-button"
						></IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
							transformOrigin={{ vertical: "top", horizontal: "left" }}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={styles.menu}
						>
							{pages.map((page) => (
								<MenuItem
									key={page.name}
									onClick={handleCloseNavMenu}
									data-testid={`menu-item-${page.name}`}
								>
									<Link href={page.href}>
										<Typography textAlign="center" sx={{ color: "#2a2d39" }}>
											{page.name}
										</Typography>
									</Link>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default NavBar;
