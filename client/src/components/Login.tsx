import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Lock, User, ArrowLeft } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorType, setErrorType] = useState<"user" | "password" | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username !== "admin") {
      setErrorType("user");
      return;
    }

    if (password !== "1234") {
      setErrorType("password");
      return;
    }

    localStorage.setItem("auth", "true");
    navigate("/sales");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* 🔙 Botón de regresar arriba a la izquierda */}
      <Button
        onClick={() => navigate("/vendedor")}
        className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Regresar
      </Button>

      <Card className="w-full max-w-md bg-gray-900 border-gray-700 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Lock className="h-12 w-12 text-purple-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Iniciar Sesión
          </CardTitle>
          <p className="text-gray-400 text-sm mt-2">
            Ingresa tus credenciales para continuar
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 🔥 Modal de error */}
      <Dialog open={!!errorType} onOpenChange={() => setErrorType(null)}>
        <DialogContent className="bg-gray-900 border border-gray-700 text-center">
          <DialogHeader>
            <DialogTitle className="text-red-500 text-xl font-bold">
              {errorType === "user"
                ? "🚫 Usuario incorrecto"
                : "🔒 Contraseña incorrecta"}
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-300 mt-2">
            {errorType === "user"
              ? "El usuario ingresado no existe."
              : "La contraseña no coincide."}
          </p>
          <Button
            onClick={() => setErrorType(null)}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white"
          >
            Cerrar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}


