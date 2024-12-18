// En el servidor (por ejemplo, Express o un servidor Node.js simple)
export async function GET(req) {
    const headers = new Headers();
    headers.set('Content-Type', 'text/event-stream');
    headers.set('Cache-Control', 'no-cache');
    headers.set('Connection', 'keep-alive');
  
    return new Response(
      (readableStreamDefaultWriter) => {
        const writer = readableStreamDefaultWriter.getWriter();
        
        const sendEvent = (data) => {
          writer.write(`data: ${JSON.stringify(data)}\n\n`);
        };
  
        // Enviar eventos de prueba
        const intervalId = setInterval(() => {
          const newEvent = {
            message: 'Nuevo evento',
            timestamp: new Date().toISOString(),
          };
          sendEvent(newEvent); // Enviar el nuevo evento
        }, 5000); // Cada 5 segundos
  
        // Limpiar la conexión cuando el cliente la cierre
        req.signal.addEventListener('abort', () => {
          clearInterval(intervalId);
          writer.close();
        });
      },
      { headers }
    );
  }
  