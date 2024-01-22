import rough from 'roughjs'
import {useEffect, useLayoutEffect, useState} from "react";
import {ColorPicker, Select, Tooltip} from "antd";
import {ClearOutlined, FormatPainterFilled, FormatPainterOutlined, RedoOutlined, UndoOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";

const roughGenerator = rough.generator();

const Tools = [
    {
        value: 'pencil',
        label: 'Pencil',
        icon: '/icons/pencil.png'
    },
    {
        value: 'line',
        label: 'Line',
        icon: '/icons/line.png'
    },
    {
        value: 'rectangle',
        label: 'Rectangle',
        icon: '/icons/rectangle.png'
    },
    {
        value: 'circle',
        label: 'Circle',
        icon: '/icons/circle.png'
    }
]

const ConstantColors = [
    "#D7D7D7",
    "#c1c1c1",
    "#ef130b",
    "#ff7100",
    "#ffe400",
    "#00cc00",
    "#00ff91",
    "#00b2ff",
    "#231fd3",
    "#a300ba",
    "#df69a7",
    "#ffac8e",
    "#a0522d"
]

const ConstantColors2 = [
    "#000000",
    "#505050",
    "#740b07",
    "#c23800",
    "#e8a200",
    "#004619",
    "#00785d",
    "#00569e",
    "#0e0865",
    "#550069",
    "#873554",
    "#cc774d",
    "#63300d"
]

const DrawingBoard = ({
                          canvasRef,
                          ctxRef,
                          elements,
                          setElements,
                          historyElements,
                          setHistoryElements,
                          socket,
                          roomId
                      }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [activeTool, setActiveTool] = useState('pencil');
    const [activeColor, setActiveColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(2);

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.isDrawer) {
            const draw = () => {
                socket.emit('draw-shape', elements, roomId)
            }
            let interval = setInterval(draw, 500);

            return () => {
                clearInterval(interval);
            }
        }
    }, [isDrawing, elements])

    useEffect(() => {
        socket.on('shape-drawn', (res, l) => {
            if(res?.length === 0) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                ctx.fillRect = '#FFFFFF';
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }

            setElements(res);
        })
    }, []);


    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.height = window.innerHeight / 1.5;
        canvas.width = window.innerWidth / 1.8;

        canvas.style.width = `100%`;
        canvas.style.height = `100%`;

        const context = canvas.getContext('2d');
        ctxRef.current = context;
        context.strokeStyle = activeColor;
        context.lineCap = 'round';
        context.lineWidth = lineWidth;

    }, []);

    useEffect(() => {
        ctxRef.current.strokeStyle = activeColor;
    }, [activeColor]);

    useEffect(() => {
        ctxRef.current.strokeWidth = lineWidth;
    }, [lineWidth]);

    useLayoutEffect(() => {
        const roughCanvas = rough.canvas(canvasRef.current);

        if (elements?.length > 0) {
            ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }

        elements.forEach(element => {
            handleDraw(element, roughCanvas);
        })
    }, [elements]);


    const handleDraw = (element, roughCanvas) => {
        switch (element.tool) {
            case 'pencil' : {
                roughCanvas.linearPath(element.path, {
                    stroke: element.stroke,
                    roughness: 0,
                    strokeWidth: element.strokeWidth
                })
            }
                break;
            case 'line' : {
                roughCanvas.draw(
                    roughGenerator.line(element.offsetX, element.offsetY, element.width, element.height, {
                        stroke: element.stroke,
                        roughness: 0,
                        strokeWidth: element.strokeWidth,
                    })
                );
            }
                break;
            case 'rectangle' : {
                roughCanvas.draw(
                    roughGenerator.rectangle(element.offsetX, element.offsetY, element.width, element.height, {
                        stroke: element.stroke,
                        roughness: 0,
                        strokeWidth: element.strokeWidth,
                    })
                );
            }
                break;
            case 'circle' : {
                roughCanvas.draw(
                    roughGenerator.circle(element.offsetX, element.offsetY, element.radius, {
                        stroke: element.stroke,
                        roughness: 0,
                        strokeWidth: element.strokeWidth,
                    })
                )
            }
                break;
            default: {
                roughCanvas.linearPath(element.path)
            }
                break
        }
    }
    const handleMouseDown = (e) => {
        const {offsetX, offsetY} = e.nativeEvent;

        switch (activeTool) {
            case 'pencil' : {
                setElements(prev => [
                    ...prev,
                    {
                        path: [[offsetX, offsetY]],
                        stroke: activeColor,
                        strokeWidth: lineWidth,
                        tool: 'pencil'
                    }
                ])
                setIsDrawing(true)
            }
                break;
            case 'line' : {
                setElements(prev => [
                    ...prev,
                    {
                        offsetX,
                        offsetY,
                        width: offsetX,
                        height: offsetY,
                        stroke: activeColor,
                        strokeWidth: lineWidth,
                        tool: 'line'
                    }
                ])
                setIsDrawing(true)
            }
                break;
            case 'rectangle' : {
                setElements(prev => [
                    ...prev,
                    {
                        offsetX,
                        offsetY,
                        width: 0,
                        height: 0,
                        stroke: activeColor,
                        strokeWidth: lineWidth,
                        tool: 'rectangle'
                    }
                ])
                setIsDrawing(true)
            }
                break;
            case 'circle' : {
                setElements(prev => [
                    ...prev,
                    {
                        offsetX,
                        offsetY,
                        radius: 0,
                        stroke: activeColor,
                        strokeWidth: lineWidth,
                        tool: 'circle'
                    }
                ])
                setIsDrawing(true)
            }
                break;
            default: {
                setElements(prev => [
                    ...prev,
                    {
                        offsetX,
                        offsetY,
                        path: [[offsetX, offsetY]],
                        stroke: activeColor,
                        strokeWidth: lineWidth
                    }
                ])
                setIsDrawing(true)
            }
                break
        }
    }

    const handleMouseUp = () => {
        setIsDrawing(false)
    }

    const handleMouseMove = (e) => {
        const {offsetX, offsetY} = e.nativeEvent;
        if (isDrawing) {
            if (elements && elements.length !== 0) {
                switch (activeTool) {
                    case 'pencil' : {
                        const {path} = elements[elements.length - 1];
                        const newPath = [...path, [offsetX, offsetY]];

                        let tempElements = elements.map((element, index) => {
                            if (index === elements.length - 1) {
                                return {
                                    ...element,
                                    path: newPath
                                }
                            } else {
                                return element
                            }
                        })

                        setElements(tempElements);
                    }
                        break;
                    case 'line' : {
                        let tempElements = elements.map((element, index) => {
                            if (index === elements.length - 1) {
                                return {
                                    ...element,
                                    width: offsetX,
                                    height: offsetY
                                }
                            } else {
                                return element;
                            }
                        })

                        setElements(tempElements);
                    }
                        break;
                    case 'rectangle' : {
                        let tempElements = elements.map((element, index) => {
                                if (index === elements.length - 1) {
                                    return {
                                        ...element,
                                        width: offsetX - element.offsetX,
                                        height: offsetY - element.offsetY,
                                    }
                                } else {
                                    return element
                                }
                            }
                        )

                        setElements(tempElements);
                    }
                        break;
                    case 'circle' : {
                        let tempElements = elements.map((element, index) => {
                                if (index === elements.length - 1) {
                                    return {
                                        ...element,
                                        radius: 2 * Math.sqrt(Math.pow(offsetX - element.offsetX, 2) + Math.pow(offsetY - element.offsetY, 2)),
                                    }
                                } else {
                                    return element
                                }
                            }
                        )

                        setElements(tempElements);
                    }
                        break;
                    default: {
                        const {path} = elements[elements.length - 1];
                        const newPath = [...path, [offsetX, offsetY]];

                        let tempElements = elements.map((element, index) => {
                            if (index === elements.length - 1) {
                                return {
                                    ...element,
                                    path: newPath
                                }
                            } else {
                                return element
                            }
                        })

                        setElements(tempElements);
                    }
                        break
                }
            }
        }
    }

    const handleUndo = () => {
        if (elements && elements.length > 0) {
            let tempElements = [...elements];
            let undoElement = tempElements.pop();

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const roughCanvas = rough.canvas(canvasRef.current);


            tempElements.forEach(element => {
                handleDraw(element, roughCanvas)
            });

            setHistoryElements(prev => [...prev, undoElement]);
            setElements(tempElements);
            socket.emit('draw-shape', tempElements, roomId);
        }
    }

    const handleRedo = () => {
        if (historyElements && historyElements.length > 0) {
            let tempElements = [...historyElements];
            let redoElement = tempElements.pop();

            setElements(prev => [...prev, redoElement]);
            setHistoryElements(tempElements);
            socket.emit('draw-shape', [...elements, redoElement], roomId);
        }
    }

    const handleClearCanvas = () => {
        if (elements?.length > 0) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.fillRect = '#FFFFFF'
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setElements([]);
            setHistoryElements([]);
            socket.emit('draw-shape', [], roomId);
        }
    }


    return (
        <div className={'drawing-board'}>
            <div className={'drawing-area'}>
                {
                    user.isDrawer ?
                        <div style={{position: 'absolute', display: 'flex', right: '28.5vw', gap: '8px', marginTop: '8px'}}>
                            <Tooltip
                                title={'Undo'}
                                color={'#9499ff'}
                            >
                                <UndoOutlined onClick={handleUndo}
                                              style={{
                                                  fontSize: '24px',
                                                  color: elements?.length > 0 ? '#000000' : '#dfdfdf',
                                                  cursor: 'pointer'
                                              }}/>
                            </Tooltip>
                            <Tooltip
                                title={'Redo'}
                                color={'#9499ff'}
                            >
                                <RedoOutlined onClick={handleRedo}
                                              style={{
                                                  fontSize: '24px',
                                                  color: historyElements?.length > 0 ? '#000000' : '#dfdfdf',
                                                  cursor: 'pointer'
                                              }}/>
                            </Tooltip>
                            <Tooltip
                                title={'Clear'}
                                color={'#9499ff'}
                            >
                                <ClearOutlined onClick={handleClearCanvas}
                                               style={{
                                                   fontSize: '24px',
                                                   color: elements?.length > 0 ? '#000000' : '#dfdfdf',
                                                   cursor: 'pointer'
                                               }}/>
                            </Tooltip>
                        </div> :
                        null
                }
                <canvas
                    ref={canvasRef}
                    style={{width: '100%', height: '100%'}}
                    id={'drawing-board'}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                />
            </div>
            <div className={`drawing-tools ${!user.isDrawer ? 'disabled-overlay' : ''}`}>
                <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                    <ColorPicker
                        size={'large'}
                        value={activeColor}
                        onChange={color => setActiveColor(color.toHexString())}
                    />
                    <div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '1px', marginBottom: '1px'}}>
                            {
                                ConstantColors.map((color, index) => <div key={index}
                                                                          onClick={() => setActiveColor(color)}
                                                                          style={{backgroundColor: `${color}`}}
                                                                          className={'color-picker'}></div>)
                            }
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '1px'}}>
                            {
                                ConstantColors2.map((color, index) => <div key={index}
                                                                           onClick={() => setActiveColor(color)}
                                                                           style={{backgroundColor: `${color}`}}
                                                                           className={'color-picker'}></div>)
                            }
                        </div>
                    </div>
                </div>
                <div className={'line-picker'}>
                    <Select
                        suffixIcon={false}
                        size={'large'}
                        style={{width: '100px'}}
                        onChange={e => setLineWidth(e)}
                        value={lineWidth}
                    >
                        <Select.Option value={2}><div style={{width: '100%', height: `2px`, backgroundColor: activeColor, borderRadius: '100px'}}></div></Select.Option>
                        <Select.Option value={4}><div style={{width: '100%', height: `4px`, backgroundColor: activeColor, borderRadius: '100px'}}></div></Select.Option>
                        <Select.Option value={6}><div style={{width: '100%', height: `6px`, backgroundColor: activeColor, borderRadius: '100px'}}></div></Select.Option>
                        <Select.Option value={8}><div style={{width: '100%', height: `8px`, backgroundColor: activeColor, borderRadius: '100px'}}></div></Select.Option>
                        <Select.Option value={10}><div style={{width: '100%', height: `10px`, backgroundColor: activeColor, borderRadius: '100px'}}></div></Select.Option>
                        <Select.Option value={12}><div style={{width: '100%', height: `12px`, backgroundColor: activeColor, borderRadius: '100px'}}></div></Select.Option>
                    </Select>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {
                        Tools.map((tool, index) => (
                            <div onClick={() => setActiveTool(tool.value)} key={index}
                                 className={`tool-container ${tool.value === activeTool ? 'tool-container-active' : ''}`}>
                                <img height={'24px'} src={tool.icon} alt={tool.label}/>
                            </div>
                        ))
                    }
                    <div onClick={() => setActiveTool('paint')} key={'paint'}
                         className={`tool-container ${'paint' === activeTool ? 'tool-container-active' : ''}`}>
                        {'paint' === activeTool ?
                            <FormatPainterFilled
                                style={{
                                    fontSize: '28px',
                                    color: '#000'
                                }}
                            /> :
                            <FormatPainterOutlined
                                style={{
                                    fontSize: '28px',
                                    color: '#000'
                                }}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DrawingBoard
