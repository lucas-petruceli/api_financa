test('Devo conhecer as principais assertivas do jest' , () => {
    let number  = null
    expect(number).toBeNull()
    number = 10
    expect(number).not.toBeNull()
    
    //valores primitivos as duas funcoes sao iguais
    expect(number).toBe(10)
    expect(number).toEqual(10)

    //maior que 
    expect(number).toBeGreaterThan(9)
    //menor que
    expect(number).toBeLessThan(11)
})


test('Devo saber trabalhar com objetos', () => {
    const obj = {name : 'Lucas' , email : 'lucaspmtt@gmail.com'}
    //possui a chave name
    expect(obj).toHaveProperty('name')
    //possui a chave name e o nome é Lucas
    expect(obj).toHaveProperty('name', 'Lucas')
    expect(obj.name).toBe('Lucas')

    const obj2 = {name : 'Lucas' , email : 'lucaspmtt@gmail.com'}
    //comparar dois objetos tem que ser o toEquals
    expect(obj).toEqual(obj2)

})