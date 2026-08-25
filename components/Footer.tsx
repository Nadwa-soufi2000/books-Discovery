import Link from "next/link";
import { BookOpen } from "lucide-react";

const footerLinks = ["Home", "Search", "Categories"];

export default function Footer() {
	return (
		<footer className="mt-16 border-t border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
				<div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
					<div className="max-w-xs">
						<Link href="/" className="inline-flex items-center gap-2 text-lg font-bold">
							<BookOpen className="h-5 w-5 text-[oklch(0.82_0.16_82)]" aria-hidden="true" />
							Books Discovery
						</Link>
						<p className="mt-3 text-sm leading-6 text-muted-foreground">
							Find your next great read and make room for a new story.
						</p>
					</div>

					<nav aria-label="Footer navigation">
						<p className="mb-3 text-sm font-semibold">Explore</p>
						<ul className="flex flex-col gap-2 text-sm text-muted-foreground">
							{footerLinks.map((link) => (
								<li key={link}>
									<Link href="#" className="transition-colors hover:text-foreground">
										{link}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>

				<div className="flex flex-col gap-2 border-t border-black/10 pt-5 text-xs text-muted-foreground dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
					<p>© {new Date().getFullYear()} Books Discovery</p>
					<p>Built for curious readers.</p>
				</div>
			</div>
		</footer>
	);
}
