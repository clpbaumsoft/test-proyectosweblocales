# FormGenerateVisitisReport

Este componente permite generar reportes de visitas en un rango de fechas específico.

## Interfaces TypeScript

### ApiVisitResponseItem
Interface que define la estructura de cada visita que viene del API:

```typescript
interface ApiVisitResponseItem {
  id: number;
  start_date: string;
  end_date: string;
  reason: string;
  reason_cancel: string | null;
  cancelled_at: string | null;
  approved_at: string | null;
  id_company: number;
  id_branch: number;
  id_gate: number;
  id_approver_docs_user: number | null;
  id_approver_user: number | null;
  id_cancelled_user: number | null;
  status: string;
  soft_delete: boolean;
  id_creator_user: number;
  creator_date: string;
  id_modifier_user: number | null;
  modifier_date: string;
  id_interventor_user: number | null;
  interventor: BaseUser | null;
  visit_visitors: VisitVisitor[];
  approver_docs: BaseUser | null;
}
```

### VisitReportData
Interface que define cómo se muestran los datos en la tabla:

```typescript
interface VisitReportData {
  id: number;
  created_at: string;
  reason: string;
  status: string;
  start_date: string;
  end_date: string;
  interventor_name: string;
  visitors_count: number;
  approver_name: string;
  document_verifier_name: string;
  visitor_first_name: string;
  visitor_middle_name: string;
  visitor_first_last_name: string;
  visitor_second_last_name: string;
  identification_type: string;
  identification_number: string;
  visitor_type: string;
}
```

### Interfaces auxiliares

- **BaseUser**: Estructura de usuarios (interventor, aprobador de documentos)
- **VisitorType**: Tipo de visitante
- **VisitorData**: Información del visitante
- **VisitVisitor**: Relación entre visita y visitante

## Funcionalidades

### Formulario de consulta
- **Fecha inicial**: Campo obligatorio para seleccionar la fecha de inicio del reporte
- **Fecha final**: Campo obligatorio para seleccionar la fecha de fin del reporte
- **Validaciones**:
  - Ambas fechas son requeridas
  - La fecha final debe ser mayor o igual a la fecha inicial
  - El rango de fechas no puede ser mayor a 1 año
- **Botón generar**: Ejecuta la consulta a la API

### Tabla de resultados
Muestra los siguientes campos:
- ID de visita
- Fecha de creación de visita
- Descripción de visita
- Estado de la visita (Pendiente, Aprobada, Rechazada, Cancelada)
- Fecha inicial y final de visita
- Interventor de la visita
- Cantidad de visitantes de la visita
- Aprobó la visita
- Verificador de documentos
- Primer nombre del visitante
- Segundo nombre del visitante
- Primer apellido del visitante
- Segundo apellido del visitante
- Tipo de identificación
- Identificación del visitante
- Tipo de visitante

### Lógica de datos
- Si una visita tiene múltiples visitantes, se crea una fila por cada visitante
- Si una visita no tiene visitantes, se muestra una fila con la información de la visita solamente
- Los estados se mapean de códigos numéricos a descripciones legibles

### Características de la tabla
- **Paginación**: Soporte para 5, 10, 25, 50, 100 filas por página
- **Encabezados fijos**: Los encabezados permanecen visibles al hacer scroll
- **Responsive**: Ancho mínimo por columna para mejor visualización
- **Filas alternadas**: Colores alternados para mejor legibilidad

### Exportación
- **Exportar a CSV**: Botón para descargar los datos en formato CSV
- **Nombre del archivo**: `reporte_visitas_YYYY-MM-DD_HH-mm.csv`

### Manejo de errores
- Mensajes de error claros para problemas de validación
- Manejo de errores de autenticación (redirige al login)
- Manejo de errores de servidor
- Indicadores de carga durante las consultas

## Archivos

- `index.tsx`: Componente principal con la interfaz de usuario
- `useFormGenerateVisitisReport.ts`: Hook personalizado con la lógica del negocio
- `README.md`: Esta documentación

## Uso

```tsx
import FormGenerateVisitisReport from "@/components/molecules/FormGenerateVisitisReport";

export default function ReportsPage() {
  return (
    <div>
      <FormGenerateVisitisReport />
    </div>
  );
}
```

## API

El componente utiliza el servicio `Orchestra.generateReportsService.allVisits(startDate, endDate)` para obtener los datos de visitas.

### Estructura esperada del API Response:
```json
[
  {
    "id": 97,
    "start_date": "2025-08-11 10:00:00",
    "end_date": "2025-08-12 16:00:00",
    "reason": "Testing 2",
    "status": "2",
    "creator_date": "2025-08-11 10:26:11",
    "interventor": {
      "fullname": "Diego Lara Fernando Lara Kshlerin Montealegre"
    },
    "visit_visitors": [
      {
        "visitor_type": {
          "short_description": "Proveedor"
        },
        "visitor": {
          "first_name": "John",
          "last_name": "Doe",
          "identification_number": "123456789"
        }
      }
    ],
    "approver_docs": {
      "fullname": "Susanna Dietrich"
    }
  }
]
```

## Dependencias

- Material-UI (@mui/material)
- Material-UI Date Pickers (@mui/x-date-pickers)
- Day.js
- React Hook Form (indirectamente a través de otros hooks del proyecto)
