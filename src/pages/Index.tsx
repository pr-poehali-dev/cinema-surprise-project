import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Movie {
  title: string;
  year: number;
  poster: string;
  description: string;
  genre: string[];
  ratings: {
    imdb: number;
    kinopoisk: number;
    rottenTomatoes: number;
  };
}

const sampleMovies: Movie[] = [
  {
    title: "Inception",
    year: 2010,
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genre: ["Sci-Fi", "Thriller", "Action"],
    ratings: {
      imdb: 8.8,
      kinopoisk: 8.7,
      rottenTomatoes: 87
    }
  },
  {
    title: "The Shawshank Redemption",
    year: 1994,
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genre: ["Drama"],
    ratings: {
      imdb: 9.3,
      kinopoisk: 9.1,
      rottenTomatoes: 91
    }
  },
  {
    title: "Interstellar",
    year: 2014,
    poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre: ["Sci-Fi", "Drama", "Adventure"],
    ratings: {
      imdb: 8.6,
      kinopoisk: 8.4,
      rottenTomatoes: 72
    }
  },
  {
    title: "The Dark Knight",
    year: 2008,
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    genre: ["Action", "Crime", "Drama"],
    ratings: {
      imdb: 9.0,
      kinopoisk: 8.5,
      rottenTomatoes: 94
    }
  },
  {
    title: "Pulp Fiction",
    year: 1994,
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    genre: ["Crime", "Drama"],
    ratings: {
      imdb: 8.9,
      kinopoisk: 8.6,
      rottenTomatoes: 92
    }
  }
];

const Index = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSurprise = () => {
    setIsAnimating(true);
    setSelectedMovie(null);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * sampleMovies.length);
      setSelectedMovie(sampleMovies[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Film" size={28} className="text-primary" />
            <span className="text-xl md:text-2xl font-bold">Cinema Surprise</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Icon name="Heart" size={18} className="mr-2" />
              <span className="hidden md:inline">Favorites</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Info" size={18} className="mr-2" />
              <span className="hidden md:inline">About</span>
            </Button>
          </nav>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Cinema Surprise
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Your movie decision, made in 10 seconds
          </p>
        </div>

        {!selectedMovie ? (
          <div className="flex justify-center">
            <Button
              onClick={handleSurprise}
              disabled={isAnimating}
              className="text-2xl md:text-3xl px-12 md:px-16 py-8 md:py-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-2xl transition-all duration-300 hover:scale-105 animate-glow"
            >
              {isAnimating ? (
                <Icon name="Loader2" className="animate-spin" size={32} />
              ) : (
                <>
                  <Icon name="Sparkles" size={32} className="mr-4" />
                  Surprise Me!
                </>
              )}
            </Button>
          </div>
        ) : (
          <Card className="overflow-hidden border-2 border-border bg-card animate-scale-in">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-2 relative">
                  <img
                    src={selectedMovie.poster}
                    alt={selectedMovie.title}
                    className="w-full h-[400px] md:h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {selectedMovie.genre.map((g) => (
                      <Badge key={g} variant="secondary" className="bg-black/60 backdrop-blur-sm text-white border-0">
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-3xl md:text-4xl font-bold">{selectedMovie.title}</h2>
                      <span className="text-2xl text-muted-foreground">{selectedMovie.year}</span>
                    </div>
                    
                    <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                      {selectedMovie.description}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="text-center p-4 bg-secondary/50 rounded-lg">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Icon name="Star" size={20} className="text-yellow-500" />
                          <span className="text-sm text-muted-foreground">IMDb</span>
                        </div>
                        <div className="text-2xl font-bold">{selectedMovie.ratings.imdb}</div>
                      </div>
                      
                      <div className="text-center p-4 bg-secondary/50 rounded-lg">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Icon name="Film" size={20} className="text-orange-500" />
                          <span className="text-sm text-muted-foreground">КП</span>
                        </div>
                        <div className="text-2xl font-bold">{selectedMovie.ratings.kinopoisk}</div>
                      </div>
                      
                      <div className="text-center p-4 bg-secondary/50 rounded-lg">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Icon name="Apple" size={20} className="text-red-500" />
                          <span className="text-sm text-muted-foreground">RT</span>
                        </div>
                        <div className="text-2xl font-bold">{selectedMovie.ratings.rottenTomatoes}%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button
                      onClick={handleSurprise}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      size="lg"
                    >
                      <Icon name="RefreshCw" size={20} className="mr-2" />
                      Another One
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      size="lg"
                    >
                      <Icon name="ExternalLink" size={20} className="mr-2" />
                      Watch Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        </div>
      </div>

      <footer className="w-full border-t border-border bg-card/50 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Film" size={24} className="text-primary" />
                <span className="font-bold text-lg">Cinema Surprise</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your movie decision, made in 10 seconds. No more endless scrolling.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Connect</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icon name="Twitter" size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icon name="Github" size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icon name="Mail" size={18} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 Cinema Surprise • Made with ❤️ for movie lovers</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;