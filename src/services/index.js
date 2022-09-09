export const line = (color,Xi,Yi, Xf, Yf, contexto)=>{
    if (!contexto) {
        return
    }
    if (color) {
        contexto.strokeStyle = color
    }
        contexto.beginPath()
        contexto.moveTo(Xi, Yi)
        contexto.lineTo(Xf, Yf)
        contexto.stroke()
        contexto.closePath()
  
}