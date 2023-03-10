<h2>Documentación para desarrolladores</h2>
<h3>Pre-requisitos:</h3>
<h4>Cliente</h4>
<ul>
  <li>Tener instalada la característica OpenSSH, se instala con PowerShell siguiendo este enlace: <a href="https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=powershell">https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=powershell</a></li>
  <li><em>opcional</em> Crear una clave SSH en la consola de comandos utilizando el comando <code>ssh-keygen -t ecdsa-sha2-nistp256</code>. Si desea cambiar el formato de encriptación de la clave, consulte la documentación de SSH2.
  <li>Asegúrate de que el servicio de Remote Registry esté habilitado en el equipo remoto, de lo contrario, los cambios no se aplicarán. Usa el comando <code>sc query remoteregistry</code> en CMD para verificar su estado, si está desactivado procede a activarlo en <em>Servicios</em>.</li>
  <li>Activar las notificaciones en el sistema.</li>
</ul>
<br/>
<h3>Comando de Build</h3>
 <li>Renombra el archivo <code>.env.example</code> por <code>.env</code> y define/verifica las variables de entorno. Luego corre el comando: <code>npm run build</code>.
<li>Para crear el ejecutable: <code>npm run make</code></li>
<br/>
<h3>Librerías utilizadas:</h3>
<a href="https://www.npmjs.com/package/socket.io-client">https://www.npmjs.com/package/socket.io-client</a>
