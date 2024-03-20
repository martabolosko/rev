import { pages } from "./_data/pages";
import { Button, Container, Grid, Typography } from "@mui/material";

export default function Home() {
	return (
		<>
			<Container maxWidth="xl">
				<Typography variant="h2" sx={{ textAlign: "center", mt: 5 }}>
					Pick your subject
				</Typography>
				<Grid
					container
					spacing={2}
					sx={{
						textAlign: "center",
						mt: 2,
					}}
				>
					{pages.map((page) => (
						<Grid item xs={12}>
							<Button
								key={page.name}
								href={page.href}
								sx={{ color: "white", backgroundColor: "#d690cf" }}
							>
								{page.name}
							</Button>
						</Grid>
					))}
				</Grid>
			</Container>
		</>
	);
}
