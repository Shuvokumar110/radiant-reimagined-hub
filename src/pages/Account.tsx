import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, LogOut, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdminRole } from "@/hooks/useAdminRole";
import { useToast } from "@/hooks/use-toast";

export default function Account() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { user, loading, signIn, signUp, signOut } = useAuth();
  const { isAdmin } = useAdminRole();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Welcome back!" });
      }
    } else {
      if (password !== confirmPassword) {
        toast({ title: "Passwords don't match", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      const { error } = await signUp(email, password, { first_name: firstName, last_name: lastName });
      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Account created!", description: "Please check your email to verify your account." });
      }
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    toast({ title: "Signed out" });
  };

  // If user is logged in, show account dashboard
  if (!loading && user) {
    return (
      <Layout>
        <section className="pt-32 md:pt-40 pb-12 md:pb-16 bg-foreground text-background">
          <div className="container mx-auto px-4 sm:px-6">
            <FadeInUp>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-background rounded-full" />
                <span className="text-xs font-medium tracking-widest uppercase text-background/70">Account</span>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="text-background">Welcome.</span><br />
                <span className="text-background/50">Back.</span>
              </h1>
            </FadeInUp>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-md mx-auto space-y-6">
              <div className="p-6 border rounded-xl">
                <p className="text-sm text-muted-foreground">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </div>

              <div className={`grid ${isAdmin ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
                <Link to="/shop" className="p-6 border rounded-xl hover:border-foreground/30 transition-all text-center">
                  <h3 className="font-semibold mb-1">Custom Outfit</h3>
                  <p className="text-xs text-muted-foreground">Start or resume an order</p>
                </Link>
                <Link to="/wishlist" className="p-6 border rounded-xl hover:border-foreground/30 transition-all text-center">
                  <h3 className="font-semibold mb-1">Wishlist</h3>
                  <p className="text-xs text-muted-foreground">Saved items</p>
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="p-6 border rounded-xl hover:border-foreground/30 transition-all text-center bg-foreground text-background">
                    <Shield className="h-5 w-5 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Admin Panel</h3>
                    <p className="text-xs opacity-70">Manage everything</p>
                  </Link>
                )}
              </div>

              <Button variant="outline" onClick={handleSignOut} className="w-full gap-2">
                <LogOut className="w-4 h-4" /> Sign Out
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-background rounded-full" />
              <span className="text-xs font-medium tracking-widest uppercase text-background/70">Account</span>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-background">{isLogin ? "Welcome." : "Join."}</span><br />
              <span className="text-background/50">{isLogin ? "Back." : "Us."}</span>
            </h1>
          </FadeInUp>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-md mx-auto">
            {/* Tab Switcher */}
            <div className="flex bg-muted rounded-xl p-1 mb-8">
              <button onClick={() => setIsLogin(true)} className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${isLogin ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                Sign In
              </button>
              <button onClick={() => setIsLogin(false)} className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${!isLogin ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                Create Account
              </button>
            </div>

            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="you@example.com" required value={email} onChange={e => setEmail(e.target.value)} className="h-12 pl-12" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" required value={password} onChange={e => setPassword(e.target.value)} className="h-12 pl-12 pr-12" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 bg-foreground text-background hover:bg-foreground/90" disabled={isLoading}>
                      {isLoading ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-background border-t-transparent rounded-full" /> : <>Sign In <ArrowRight className="ml-2 h-5 w-5" /></>}
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="register" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input id="firstName" placeholder="John" required value={firstName} onChange={e => setFirstName(e.target.value)} className="h-12 pl-12" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" required value={lastName} onChange={e => setLastName(e.target.value)} className="h-12" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registerEmail">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="registerEmail" type="email" placeholder="you@example.com" required value={email} onChange={e => setEmail(e.target.value)} className="h-12 pl-12" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registerPassword">Create Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="registerPassword" type={showPassword ? "text" : "password"} placeholder="Min. 8 characters" required value={password} onChange={e => setPassword(e.target.value)} className="h-12 pl-12 pr-12" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="confirmPassword" type="password" placeholder="Confirm your password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="h-12 pl-12" />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 bg-foreground text-background hover:bg-foreground/90" disabled={isLoading}>
                      {isLoading ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-background border-t-transparent rounded-full" /> : <>Create Account <ArrowRight className="ml-2 h-5 w-5" /></>}
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                      By creating an account, you agree to our{" "}
                      <Link to="/terms" className="text-foreground hover:underline">Terms of Service</Link>{" "}and{" "}
                      <Link to="/privacy" className="text-foreground hover:underline">Privacy Policy</Link>
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Benefits */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-12 p-6 bg-muted rounded-xl">
              <h3 className="font-semibold mb-4">Account Benefits</h3>
              <ul className="space-y-3">
                {["Track your orders and quotes", "Save & continue custom outfits later", "Faster checkout with saved details", "Exclusive member discounts"].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-foreground" />
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
