const defaultGrid = (x, y) => {
    const xGrid = x? x : 20
    const yGrid = y? y : xGrid
    var grid = new Array(yGrid)

    for(var j = 0; j < yGrid; j++){
        grid[j] = new Array(xGrid)

        for(var i = 0; i < xGrid; i++){
            grid[j][i] = 0
        }
    }
    return JSON.stringify(grid)
}

export default {
    defaultGrid
}