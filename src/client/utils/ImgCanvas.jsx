import { Layer, PaperScope, Raster } from 'paper/dist/paper-core'
import React, { useEffect } from 'react'

import gridUtils from './grid'

function areEqual(prevProps, nextProps) {
    return prevProps.url == nextProps.url 
        && prevProps.height == nextProps.height 
        && prevProps.width == nextProps.width
}

export const ImgCanvas = React.memo(function ImgCanvas(props) {
    useEffect(() => {
        drawImg()
        return () => {};
    }, [props.url]);

    const drawImg = () => {
        if(props.url == null){
            return
        }

        // TODO: call on browser resize
        var canvas = document.getElementById('imgCanvas')
        var paper = new PaperScope()
        paper.setup(canvas)

        // Map Layer
        var mapLayer = new Layer()
        var map = new Raster({
            source: props.url,
            position: new paper.Point(gridUtils.getDimension(canvas.width)/2, gridUtils.getDimension(canvas.height)/2)
        });
        map.onLoad = function() {
            // Map scale
            const scaleFactor = Math.min(gridUtils.getDimension(canvas.width) / map.width, gridUtils.getDimension(canvas.height) / map.height)
            map.scale(scaleFactor)

            // Map Coords
            const mapCoords = {
                start: { x: map.bounds.topLeft.x, y: map.bounds.topLeft.y },
                end: { x: map.bounds.bottomRight.x, y: map.bounds.bottomRight.y },
            }
            props.changeMapCoords(mapCoords)
        }
    }

    return (
        <canvas id='imgCanvas' style={{zIndex: 0, position: 'absolute', height: props.height, width: props.width, bottom: 13}}></canvas>
    );
}, areEqual)