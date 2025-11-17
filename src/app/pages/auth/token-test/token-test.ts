import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token-test',
  standalone: false,
  templateUrl: './token-test.html',
  styleUrl: './token-test.css'
})
export class TokenTest {

  token: string = '';
  doctorInfo = {
    id: 1,
    firstName: "Paola",
    lastName: "De Leon Suarez",
    professionalLicense: "MED-123458",
    employmentStart: "2022-09-15",
    graduationInstitution: "Universidad Nacional Autónoma de México",
    currentWorkplace: "Hospital General de Chiapas",
    email: "paola@hospitalchiapas.mx",
    password: "12345678",
    genderId: 1
  }
  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  // Método para actualizar el token desde el textarea
  onTokenChange(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.token = value;
  }

  setToken(): void {
    const cleanToken = this.token.trim().replace(/\s+/g, '');
    
    console.log('🔍 Token ingresado:', cleanToken);
    console.log('📏 Longitud del token:', cleanToken.length);
    
    if (cleanToken.length > 0) {
      try {
        this.authService.setTokenManually(cleanToken, this.doctorInfo);
        
        const savedToken = this.authService.getToken();
        const savedDoctor = this.authService.getCurrentDoctor();
        
        console.log('💾 Token guardado:', savedToken);
        console.log('👨‍⚕️ Doctor guardado:', savedDoctor);
        
        if (savedToken && savedDoctor) {
          alert(`✅ Token guardado exitosamente!\n\n👨‍⚕️ Doctor: ${savedDoctor.firstName} ${savedDoctor.lastName}\n📧 Email: ${savedDoctor.email}\n🆔 ID: ${savedDoctor.id}\n\n🔄 Redirigiendo al dashboard...`);
          
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
        } else {
          alert('⚠️ El token se guardó pero hubo un problema al verificarlo');
          console.error('❌ Token o doctor no se guardaron correctamente');
        }
      } catch (error) {
        console.error('❌ Error al guardar token:', error);
        alert('❌ Error al guardar el token. Verifica la consola para más detalles.');
      }
    } else {
      alert('❌ Por favor ingresa un token válido\n\n💡 El token no puede estar vacío');
      console.warn('⚠️ Token vacío o inválido');
    }
  }

  checkAuth(): void {
    const isAuth = this.authService.isAuthenticated();
    const doctor = this.authService.getCurrentDoctor();
    const token = this.authService.getToken();
    
    console.log('🔐 Verificando autenticación...');
    console.log('✓ isAuthenticated:', isAuth);
    console.log('✓ Doctor:', doctor);
    console.log('✓ Token existe:', !!token);
    
    if (isAuth && doctor) {
      alert(`✅ Sesión activa\n\n👨‍⚕️ Doctor: ${doctor.firstName} ${doctor.lastName}\n📧 Email: ${doctor.email}\n🆔 ID: ${doctor.id}\n\n🎫 Token: ${token?.substring(0, 30)}...`);
    } else {
      alert('❌ No hay sesión activa\n\nPor favor, ingresa un token válido y haz click en "Guardar Token"');
    }
  }

  logout(): void {
    const doctor = this.authService.getCurrentDoctor();
    const doctorName = doctor ? `${doctor.firstName} ${doctor.lastName}` : 'Usuario';
    
    this.authService.logout();
    alert(`👋 Sesión cerrada correctamente\n\n${doctorName} ha sido desconectado`);
    console.log('✅ Usuario desconectado');
  }

  clearToken(): void {
    this.token = '';
    console.log('🧹 Textarea limpiado');
  }
}
