# Repositorio de Agustin Gimenez Bava - Arquitectura Web UP


## Nombre del grupo: TBC
## Integrante: Agustin Gimenez Bava
## Descripcion del negocio: 
### Una API que permita administrar torneos de FIFA online. Permitiendo registrar un equipo, un capitan asociado a ese equipo, realizar un torneo y devolver cuales serian los cruces. Ademas, permitiria cargar los datos de los partidos, o modificarlos/borrarlos de ser necesario. Tambien podra traer informacion historica sobre cada equipo, con detalle de cada participacion.
---
### Como probarla?
1. Correr npm start en la carpeta /fifa_champions
2. Abrir en un navegador o utilizando Postman: http://localhost:4000
3. Utilizar los endpoints necesarios, con los verbos deseados segun la accion a ejecutar
- Ejemplos:
- http://localhost:4000/api/teams
- http://localhost:4000/api/cups
- http://localhost:4000/api/players
- http://localhost:4000/api/subscriptions
- http://localhost:4000/api/teams?team_id=Triunvi
- etc