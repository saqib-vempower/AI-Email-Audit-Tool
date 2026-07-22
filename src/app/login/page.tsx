
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"

import { signInWithEmailAndPassword } from "firebase/auth"
import { useToast } from "@/hooks/use-toast"
import { AnyAaaaRecord } from "node:dns"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()
  const { toast } = useToast()

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()

  setErrorMessage("")
  setLoading(true)
  
    if (!auth) {
      toast({
        title: "Demo Mode Enabled",
        description: "Firebase configuration missing. Redirecting to dashboard.",
      });
  
      setTimeout(() => {
        router.push("/dashboard");
        setLoading(false);
      }, 1000);
  
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
  
      toast({
        title: "Welcome Back",
        description: "Successfully signed in.",
      });
  
      router.push("/dashboard");
    }  catch (error: any) {
      console.error(error);
    
      switch (error?.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          setErrorMessage("Incorrect email or password.");
          break;
    
        case "auth/invalid-email":
          setErrorMessage("Please enter a valid email address.");
          break;
    
        case "auth/user-disabled":
          setErrorMessage("This account has been disabled.");
          break;
    
        case "auth/too-many-requests":
          setErrorMessage("Too many failed login attempts. Try again later.");
          break;
    
        case "auth/network-request-failed":
          setErrorMessage("Please check your internet connection.");
          break;
    
        default:
          setErrorMessage("Login failed. Please try again.");
      }
    
  
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>
            {errorMessage && (
  <p className="text-sm text-red-600">
    {errorMessage}
  </p>
)}
            <Button type="submit" className="w-full mt-6" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
              Sign In with Email
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
        
          <div className="mt-4">
            <Link href="/" className="text-sm text-blue-600 hover:underline flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
