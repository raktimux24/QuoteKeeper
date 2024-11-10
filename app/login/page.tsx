'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Chrome as ChromeIcon } from "lucide-react";
import { signInWithGoogle, signUpWithEmail, signInWithEmail } from '@/lib/firebase/auth';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/app/providers/auth-provider';

type TabValue = 'signin' | 'signup';

const ButtonStyles = {
  primary: "w-full bg-amber-500 hover:bg-amber-600 text-white " +
          "font-sans text-sm font-medium transition-all duration-300 hover:scale-[1.02] " +
          "hover:shadow-lg hover:shadow-amber-500/25 disabled:opacity-50 " + 
          "focus:ring-2 focus:ring-amber-500 focus:ring-offset-2",
          
  google: "w-full font-sans text-sm border-2 border-amber-200/20 " +
          "hover:bg-amber-50/50 dark:hover:bg-amber-500/10 " +
          "transition-all duration-300 hover:scale-[1.02] hover:border-amber-500/50 group " +
          "focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
};

const InputStyles = "font-sans text-sm bg-white/50 dark:bg-gray-800/50 " +
                   "border-amber-200/20 focus:border-amber-500 " +
                   "transition-colors duration-200";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<TabValue>('signin');
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (isSignUp: boolean) => {
    try {
      setLoading(true);
      setError('');

      let user;
      if (isSignUp) {
        if (!name.trim()) {
          throw new Error('Name is required');
        }
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        user = await signUpWithEmail(email, password, name);
      } else {
        user = await signInWithEmail(email, password);
      }

      if (user) {
        console.log('Email auth successful');
        toast({
          title: "Success",
          description: isSignUp ? "Account created successfully" : "Signed in successfully",
        });
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error instanceof Error ? error.message : 'Authentication failed');
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Authentication failed',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
    setError('');
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      const user = await signInWithGoogle();
      if (user) {
        console.log('Google sign-in successful');
        toast({
          title: "Success",
          description: "Signed in successfully",
        });
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('Failed to sign in with Google');
      toast({
        title: "Error",
        description: "Failed to sign in with Google",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 relative overflow-hidden">
      {/* Grid Background - Same as dashboard */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201, 128, 35, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201, 128, 35, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md backdrop-blur-sm bg-white/90 border-2 border-amber-200/20">
          <CardHeader className="text-center space-y-2">
            <div className="text-xs uppercase tracking-[0.2em] text-amber-500 dark:text-amber-400 font-sans">
              Welcome to
            </div>
            <CardTitle className="font-serif text-5xl font-bold text-amber-600 dark:text-amber-300 mb-2">
              Quote Keeper
            </CardTitle>
            <CardDescription className="font-sans text-sm text-gray-600 dark:text-gray-400">
              Your personal collection of inspiring quotes
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Tabs 
              defaultValue="signin" 
              value={activeTab}
              onValueChange={(value: TabValue) => {
                setActiveTab(value);
                resetForm();
              }}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={InputStyles}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={InputStyles}
                    />
                  </div>
                  <Button 
                    className={ButtonStyles.primary}
                    onClick={() => handleSubmit(false)}
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="signup">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={InputStyles}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={InputStyles}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Choose a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={InputStyles}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={InputStyles}
                    />
                  </div>
                  <Button 
                    className={ButtonStyles.primary}
                    onClick={() => handleSubmit(true)}
                    disabled={loading}
                  >
                    {loading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {error && (
              <p className="text-red-500 text-sm text-center font-sans animate-shake">{error}</p>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-amber-200/20"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 font-sans">
                  Or continue with
                </span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className={ButtonStyles.google}
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <ChromeIcon className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12 text-amber-500" />
              {loading ? 'Signing in...' : (activeTab === 'signin' ? 'Sign in with Google' : 'Sign up with Google')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}