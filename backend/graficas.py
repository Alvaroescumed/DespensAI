import matplotlib.pyplot as plt

# Datos
modelos = ['ChatGPT', 'Hugging Bear']
tiempos = [15.21, 21.50]

# Crear gráfico de barras
plt.bar(modelos, tiempos, color=['blue', 'orange'])
plt.xlabel('Modelos')
plt.ylabel('Tiempo de respuesta (s)')
plt.title('Comparativa de Tiempo de Respuesta entre Modelos de IA')
plt.show()

# guardamos la gráfica
plt.savefig('comparativa_tiempos.png')