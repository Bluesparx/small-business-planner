import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Calculator,
  LayoutDashboard,
  Upload,
  BarChart3,
  Menu,
  Home,
  Info,
  LogOut,
  LogIn,
  UserPlus,
  CreditCard,
} from "lucide-react";

const SidebarContent = ({ isLoggedIn, onLogout }) => {
  return (
    <div className="flex flex-col gap-4 pl-4 text-white">
      {!isLoggedIn && (
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Button>
        </Link>
      )}
      
      <Link to="/about">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Info className="h-5 w-5" />
          <span>About</span>
        </Button>
      </Link>

      <Link to="/subscription">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <CreditCard className="h-5 w-5" />
          <span>Pricing</span>
        </Button>
      </Link>

      {isLoggedIn ? (
        <>
          <Link to="/dash">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Button>
          </Link>

          <div className="space-y-4">
            <div className="text-sm font-semibold px-4 text-white/70">
              Tools
            </div>
            
            <div className="space-y-1">
              <Link to="/emi">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Calculator className="h-5 w-5" />
                  <span>EMI Calculator</span>
                </Button>
              </Link>
              
              <Link to="/sip">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Calculator className="h-5 w-5" />
                  <span>SIP Calculator</span>
                </Button>
              </Link>
            </div>

            <div className="text-sm font-semibold px-4 text-white/70">
              Data
            </div>
            
            <div className="space-y-1">
              <Link to="/incomeS">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Upload className="h-5 w-5" />
                  <span>Income Statement</span>
                </Button>
              </Link>
              
              <Link to="/stockInput">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Upload className="h-5 w-5" />
                  <span>Stocks Data</span>
                </Button>
              </Link>
            </div>

            <div className="text-sm font-semibold px-4 text-white/70">
              Analytics
            </div>
            
            <div className="space-y-1">
              <Link to="/analysis">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Finance</span>
                </Button>
              </Link>
              
              <Link to="/stock-analysis">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Stocks Data</span>
                </Button>
              </Link>
            </div>

            <div className="space-y-1">
              
              
              <Link to="/community">
                <Button variant="ghost" className="w-full justify-start gap-2">
                <PlusCircle className="w-6 h-6 text-blue-500 cursor-pointer" />
                  <span>Join/Create Community</span>
                </Button>
              </Link>
            </div>

            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2"
              onClick={onLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </>
      ) : (
        <div className="space-y-1">
          <Link to="/login">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Button>
          </Link>
          
          <Link to="/signup">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <UserPlus className="h-5 w-5" />
              <span>Sign Up</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isLoggedIn, onLogout }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 w-60 h-screen bg-[#57535f] border-none">
        <div className="p-4">
          <h1 className="text-2xl text-center font-bold text-gray-300">
            Vyapaar-e
          </h1>
        </div>
        <SidebarContent isLoggedIn={isLoggedIn} onLogout={onLogout} />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
          <Button
        variant="ghost"
        size="icon"
        className="flex items-center justify-center w-12 h-12"
      >
        <Menu className="h-8 w-8" />
      </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 border-none bg-gray-600 p-0">
            <SheetHeader className="p-4">
              <SheetTitle className="text-2xl font-bold text-blue-500 dark:text-blue-400">
                Vyapaar-e
              </SheetTitle>
            </SheetHeader>
            <SidebarContent isLoggedIn={isLoggedIn} onLogout={onLogout} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;