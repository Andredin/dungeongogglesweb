import React, { useState, useEffect } from 'react'

import { Layer, Path, Point, PaperScope } from 'paper/dist/paper-core'
import db from './db';

export const GridCanvas = (props) => {
    const readOnly = props.dmId == null

    useEffect(() => {
        drawGrid()
        return () => {}
    });

    const drawGrid = () => {
        if(props.grid == null){
            return
        }

        // Grid Layer
        var canvas = document.getElementById('gridCanvas')
        var paper = new PaperScope()
        paper.setup(canvas)

        const gridArr = JSON.parse(props.grid) 
        const mapCoordsObj = JSON.parse(props.mapCoords)
        var gridLayer = new Layer()
        var gridSizeY = gridArr.length
        var gridSizeX = gridArr[0].length
        var rectangleSizeX = (mapCoordsObj.end.x - mapCoordsObj.start.x) / gridSizeX
        var rectangleSizeY = (mapCoordsObj.end.y - mapCoordsObj.start.y) / gridSizeY
        var initX = mapCoordsObj.start.x
        var initY = mapCoordsObj.start.y
        for(var i = 0; i < gridSizeX; i++){
            for(var j = 0; j < gridSizeY; j++){
                // Dimensions
                var rectX = initX + (i * rectangleSizeX)
                var rectY = initY + (j * rectangleSizeY)
                var rectangle = new Path.Rectangle(new Point(rectX, rectY), new Point(rectX + rectangleSizeX, rectY + rectangleSizeY))
                
                const show = gridArr[j][i] == 0
                
                // Events
                if(!readOnly){
                    const iToggle = i
                    const jToggle = j
                    const show = gridArr[j][i] == 0
                    const rectHighlight = rectangle
                    rectangle.onMouseDown = function() { toggleGrid(iToggle, jToggle) }
                    rectangle.onMouseEnter = function(e) { e.stopPropagation(); highlightRectangle(rectHighlight); }
                    rectangle.onMouseLeave = function(e) { e.stopPropagation(); unHighlightRectangle(show, rectHighlight) }
                }

                // Styles
                rectangle.style = {
                    strokeColor: readOnly? 'white' : 'black',
                    strokeWidth: 2,
                    fillColor: 'white'
                }
                rectangle.opacity = getOpacity(show)
            }
        }
    }

    const getOpacity = (show) => {
        return show? (readOnly? 1 : 0.5) : 0;
    }

    const toggleGrid = (i, j) => {
        var newGrid = JSON.parse(props.grid)
        if(newGrid[j][i] == 0){
            newGrid[j][i] = 1
        } else {
            newGrid[j][i] = 0
        }

        db.saveMapChanges(props.dmId, {grid: JSON.stringify(newGrid)})
    }

    const highlightRectangle = (rectangle) => {
        //TODO: improve performance
        //rectangle.opacity = getOpacity(true) / 2
        document.getElementById('gridCanvas').style.cursor = 'pointer'
    }

    const unHighlightRectangle = (show, rectangle) => {
        //TODO: improve performance
        //rectangle.opacity = getOpacity(show)
        document.getElementById('gridCanvas').style.cursor = 'default'
    }

    return (
        <canvas id='gridCanvas' style={{zIndex: 1, position: 'absolute', height: props.height, width: props.width, bottom: 13}}></canvas>
    );
}