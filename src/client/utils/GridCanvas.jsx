import React, { useState, useEffect } from 'react'

import { Layer, Path, Point, PaperScope } from 'paper/dist/paper-core'
import db from './db';

export const GridCanvas = (props) => {
    const [grid, setGrid] = useState(null)

    useEffect(() => {
        const unsubscribe = db.subscribeToDmMap(props.dmId, (dbError, dbMap) => {
            if (dbError) {
                setError(dbError)
                return
            }
            console.log(dbMap)
            setGrid(dbMap.grid != null? dbMap.grid : defaultGrid())
            
        })

        drawGrid()
        return () => {}
    });

    const defaultGrid = () => {
        return JSON.stringify([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ])
    }

    const drawGrid = () => {
        if(grid == null){
            return
        }

        // Grid Layer
        var canvas = document.getElementById('gridCanvas')
        var paper = new PaperScope()
        paper.setup(canvas)

        const gridArr = JSON.parse(grid) 
        const mapCoordsObj = JSON.parse(props.mapCoords)
        var gridLayer = new Layer()
        var gridSize = gridArr.length
        var rectangleSizeX = (mapCoordsObj.end.x - mapCoordsObj.start.x) / gridSize
        var rectangleSizeY = (mapCoordsObj.end.y - mapCoordsObj.start.y) / gridSize
        var initX = mapCoordsObj.start.x
        var initY = mapCoordsObj.start.y
        for(var i = 0; i < gridSize; i++){
            for(var j = 0; j < gridSize; j++){
                // Dimensions
                var rectX = initX + (i * rectangleSizeX)
                var rectY = initY + (j * rectangleSizeY)
                var rectangle = new Path.Rectangle(new Point(rectX, rectY), new Point(rectX + rectangleSizeX, rectY + rectangleSizeY))
                
                // Events
                const iToggle = i
                const jToggle = j
                const show = gridArr[j][i] == 0
                const rectHighlight = rectangle
                rectangle.onMouseDown = function() { toggleGrid(iToggle, jToggle) }
                rectangle.onMouseEnter = function() { highlightRectangle(rectHighlight) }
                rectangle.onMouseLeave = function() { unHighlightRectangle(show, rectHighlight) }

                // Styles
                rectangle.style = {
                    strokeColor: 'black',
                    strokeWidth: 5,
                    fillColor: 'white'
                }
                rectangle.opacity = show? 0.5 : 0
            }
        }
    }

    const toggleGrid = (i, j) => {
        var newGrid = JSON.parse(grid)
        if(newGrid[j][i] == 0){
            newGrid[j][i] = 1
        } else {
            newGrid[j][i] = 0
        }

        setGrid(JSON.stringify(newGrid))
        db.saveMapChanges(props.dmId, {grid: JSON.stringify(newGrid)})
    }

    const highlightRectangle = (rectangle) => {
        rectangle.opacity = 0.25
        document.getElementById('gridCanvas').style.cursor = 'pointer'
    }

    const unHighlightRectangle = (show, rectangle) => {
        rectangle.opacity = show? 0.5 : 0
        document.getElementById('gridCanvas').style.cursor = 'default'
    }

    return (
        <canvas id='gridCanvas' style={{zIndex: 1, position: 'absolute', height: props.height, width: props.width, bottom: 13}}></canvas>
    );
}