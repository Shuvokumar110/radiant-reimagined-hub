// Shop-specific product data (independent from team builder)

// Soccer product images
import soccerFullKit from "@/assets/products/soccer-full-kit-new.png";
import soccerFullKitBlue from "@/assets/products/soccer-full-kit-blue.png";
import soccerFullKitGreen from "@/assets/products/soccer-full-kit-green.png";
import soccerFullKitYellow from "@/assets/products/soccer-full-kit-yellow.png";
import soccerFullKitBrush from "@/assets/products/soccer-full-kit-brush.png";
import soccerFullKitOrange from "@/assets/products/soccer-full-kit-orange.png";
import soccerFullKitMarble from "@/assets/products/soccer-full-kit-marble.png";
import soccerFullKitPink from "@/assets/products/soccer-full-kit-pink.png";
import soccerJersey from "@/assets/products/soccer-jersey-short-new.png";
import soccerJerseyBlue from "@/assets/products/soccer-jersey-blue.png";
import soccerShorts from "@/assets/products/soccer-shorts-new.png";
import soccerSocks from "@/assets/products/soccer-socks-new.png";

// Basketball product images
import bask100Kit from "@/assets/products/basketball/bask-100-kit.png";
import bask200Kit from "@/assets/products/basketball/bask-200-kit.png";
import bask300Kit from "@/assets/products/basketball/bask-300-jersey-back.png";
import bask400Kit from "@/assets/products/basketball/bask-400-jersey-front.png";
import bask500Kit from "@/assets/products/basketball/bask-500-kit.png";
import bask600Kit from "@/assets/products/basketball/bask-600-kit.png";
import bask700Kit from "@/assets/products/basketball/bask-700-kit.png";
import bask800Kit from "@/assets/products/basketball/bask-800-kit.png";
import bask900Kit from "@/assets/products/basketball/bask-900-kit.png";

// American Football
import footballGameJersey from "@/assets/products/football-game-jersey.jpg";
import footballPracticeJersey from "@/assets/products/football-practice-jersey.jpg";
import footballPants from "@/assets/products/football-pants.jpg";
import footballFlagSet from "@/assets/products/football-flag-set.jpg";
import footballWarmup from "@/assets/products/football-warmup.jpg";

// Baseball
import baseballJerseyButton from "@/assets/products/baseball-jersey-button.jpg";
import baseballJerseyPullover from "@/assets/products/baseball-jersey-pullover.jpg";
import baseballPants from "@/assets/products/baseball-pants.jpg";
import baseballFullUniform from "@/assets/products/baseball-full-uniform.jpg";

// Volleyball / Netball (placeholders)
import volleyballImg from "@/assets/categories/volleyball.png";
import netballImg from "@/assets/categories/netball.png";

// Cricket
import cricketJersey from "@/assets/products/cricket-jersey.jpg";
import cricketPants from "@/assets/products/cricket-pants.jpg";
import cricketTraining from "@/assets/products/cricket-training.jpg";
import cricketSweater from "@/assets/products/cricket-sweater.jpg";

// Tracksuits / Hoodies / Polo
import tracksuitImg from "@/assets/categories/tracksuits.png";
import hoodiesImg from "@/assets/categories/hoodies.png";
import poloImg from "@/assets/categories/polo-jerseys.png";
import sportsJerseyImg from "@/assets/categories/sports-jersey.png";

export interface ShopProduct {
  id: string;
  name: string;
  image: string;
  price: string;
  tag?: string;
}

export const shopProductsByCategory: Record<string, ShopProduct[]> = {
  soccer: [
    { id: "soc-1", name: "Full Kit – Classic", image: soccerFullKit, price: "Contact for Quote" },
    { id: "soc-2", name: "Full Kit – V-Neck", image: soccerFullKitBlue, price: "Contact for Quote" },
    { id: "soc-3", name: "Full Kit – Diagonal", image: soccerFullKitGreen, price: "Contact for Quote" },
    { id: "soc-4", name: "Full Kit – Center Stripe", image: soccerFullKitYellow, price: "Contact for Quote" },
    { id: "soc-5", name: "Full Kit – Brush Stroke", image: soccerFullKitBrush, price: "Contact for Quote" },
    { id: "soc-6", name: "Full Kit – Panel", image: soccerFullKitOrange, price: "Contact for Quote" },
    { id: "soc-7", name: "Full Kit – Marble", image: soccerFullKitMarble, price: "Contact for Quote" },
    { id: "soc-8", name: "Full Kit – Hex", image: soccerFullKitPink, price: "Contact for Quote" },
    { id: "soc-9", name: "Jersey – Short Sleeve", image: soccerJersey, price: "Contact for Quote" },
    { id: "soc-10", name: "Jersey – V-Neck", image: soccerJerseyBlue, price: "Contact for Quote" },
    { id: "soc-11", name: "Shorts", image: soccerShorts, price: "Contact for Quote" },
    { id: "soc-12", name: "Socks", image: soccerSocks, price: "Contact for Quote" },
  ],
  basketball: [
    { id: "bask-1", name: "Style 100", image: bask100Kit, price: "Contact for Quote" },
    { id: "bask-2", name: "Style 200", image: bask200Kit, price: "Contact for Quote" },
    { id: "bask-3", name: "Style 300", image: bask300Kit, price: "Contact for Quote" },
    { id: "bask-4", name: "Style 400", image: bask400Kit, price: "Contact for Quote" },
    { id: "bask-5", name: "Style 500", image: bask500Kit, price: "Contact for Quote" },
    { id: "bask-6", name: "Style 600", image: bask600Kit, price: "Contact for Quote" },
    { id: "bask-7", name: "Style 700", image: bask700Kit, price: "Contact for Quote" },
    { id: "bask-8", name: "Style 800", image: bask800Kit, price: "Contact for Quote" },
    { id: "bask-9", name: "Style 900", image: bask900Kit, price: "Contact for Quote" },
  ],
  "american-football": [
    { id: "fb-1", name: "Game Jersey", image: footballGameJersey, price: "Contact for Quote" },
    { id: "fb-2", name: "Practice Jersey", image: footballPracticeJersey, price: "Contact for Quote" },
    { id: "fb-3", name: "Football Pants", image: footballPants, price: "Contact for Quote" },
    { id: "fb-4", name: "Flag Football Set", image: footballFlagSet, price: "Contact for Quote" },
    { id: "fb-5", name: "Warmup Gear", image: footballWarmup, price: "Contact for Quote" },
  ],
  "baseball-softball": [
    { id: "bb-1", name: "Jersey (Button)", image: baseballJerseyButton, price: "Contact for Quote" },
    { id: "bb-2", name: "Jersey (Pullover)", image: baseballJerseyPullover, price: "Contact for Quote" },
    { id: "bb-3", name: "Baseball Pants", image: baseballPants, price: "Contact for Quote" },
    { id: "bb-4", name: "Full Uniform Bundle", image: baseballFullUniform, price: "Contact for Quote" },
  ],
  volleyball: [
    { id: "vb-1", name: "Volleyball Kit", image: volleyballImg, price: "Contact for Quote", tag: "Coming Soon" },
  ],
  netball: [
    { id: "nb-1", name: "Netball Kit", image: netballImg, price: "Contact for Quote", tag: "Coming Soon" },
  ],
  cricket: [
    { id: "cr-1", name: "Cricket Jersey", image: cricketJersey, price: "Contact for Quote" },
    { id: "cr-2", name: "Cricket Pants", image: cricketPants, price: "Contact for Quote" },
    { id: "cr-3", name: "Training Kit", image: cricketTraining, price: "Contact for Quote" },
    { id: "cr-4", name: "Cricket Sweater", image: cricketSweater, price: "Contact for Quote" },
  ],
  tracksuits: [
    { id: "ts-1", name: "Team Tracksuit", image: tracksuitImg, price: "Contact for Quote" },
  ],
  hoodies: [
    { id: "hd-1", name: "Team Hoodie", image: hoodiesImg, price: "Contact for Quote" },
  ],
  "polo-jerseys": [
    { id: "pl-1", name: "Polo Jersey", image: poloImg, price: "Contact for Quote" },
  ],
  "sports-jersey": [
    { id: "sj-1", name: "Sports Jersey", image: sportsJerseyImg, price: "Contact for Quote" },
  ],
};
