# Crear una lista para almacenar los números
numeros = []

# Pedir al usuario que ingrese 10 números
for i in range(10):
    numero = float(input(f"Ingrese el número {i+1}: "))
    numeros.append(numero)

# Calcular la suma
suma = sum(numeros)

# Calcular la multiplicación
multiplicacion = 1
for num in numeros:
    multiplicacion *= num

# Mostrar resultados
print("\nResultados:")
print(f"Los números ingresados son: {numeros}")
print(f"La suma de los números es: {suma}")
print(f"La multiplicación de los números es: {multiplicacion}")
