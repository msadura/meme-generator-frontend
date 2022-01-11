import { fabric } from 'fabric';

export default function initFabricHandlers() {
  // create a rect object
  const deleteIcon =
    'data:image/svg+xml,%3Csvg%20fill%3D%22%23ffffff%22%20%20version%3D%221.1%22%20id%3D%22Capa_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0A%09%20width%3D%2260px%22%20height%3D%2260px%22%20viewBox%3D%220%200%2060%2060%22%20style%3D%22enable-background%3Anew%200%200%2041.336%2041.336%3B%22%0A%09%20xml%3Aspace%3D%22preserve%22%3E%0A%3Cg%3E%0A%20%20%20%20%3Crect%20y%3D%220%22%20x%3D%220%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23ff5724%22%3E%3C%2Frect%3E%0A%09%3Cpath%20transform%3D%22translate(8%2C%208)%22%20d%3D%22M36.335%2C5.668h-8.167V1.5c0-0.828-0.672-1.5-1.5-1.5h-12c-0.828%2C0-1.5%2C0.672-1.5%2C1.5v4.168H5.001c-1.104%2C0-2%2C0.896-2%2C2%0A%09%09s0.896%2C2%2C2%2C2h2.001v29.168c0%2C1.381%2C1.119%2C2.5%2C2.5%2C2.5h22.332c1.381%2C0%2C2.5-1.119%2C2.5-2.5V9.668h2.001c1.104%2C0%2C2-0.896%2C2-2%0A%09%09S37.438%2C5.668%2C36.335%2C5.668z%20M14.168%2C35.67c0%2C0.828-0.672%2C1.5-1.5%2C1.5s-1.5-0.672-1.5-1.5v-21c0-0.828%2C0.672-1.5%2C1.5-1.5%0A%09%09s1.5%2C0.672%2C1.5%2C1.5V35.67z%20M22.168%2C35.67c0%2C0.828-0.672%2C1.5-1.5%2C1.5s-1.5-0.672-1.5-1.5v-21c0-0.828%2C0.672-1.5%2C1.5-1.5%0A%09%09s1.5%2C0.672%2C1.5%2C1.5V35.67z%20M25.168%2C5.668h-9V3h9V5.668z%20M30.168%2C35.67c0%2C0.828-0.672%2C1.5-1.5%2C1.5s-1.5-0.672-1.5-1.5v-21%0A%09%09c0-0.828%2C0.672-1.5%2C1.5-1.5s1.5%2C0.672%2C1.5%2C1.5V35.67z%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E';

  var img = document.createElement('img');
  img.src = deleteIcon;

  fabric.Object.prototype.transparentCorners = false;

  function renderIcon(
    ctx: any,
    left: number,
    top: number,
    styleOverride: any,
    fabricObject: fabric.Object
  ) {
    var size = 20;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle as number));
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  // Text
  fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: 10,
    offsetX: -10,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon
  });
  fabric.Textbox.prototype.setControlVisible('tr', false);
  fabric.Textbox.prototype.cornerColor = '#ffffff';
  fabric.Textbox.prototype.borderColor = '#2094f3';
  fabric.Textbox.prototype.cornerStrokeColor = '#2094f3';

  //Image
  fabric.Image.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: 10,
    offsetX: -10,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon
  });
  fabric.Image.prototype.setControlVisible('tr', false);
  fabric.Image.prototype.cornerColor = '#ffffff';
  fabric.Image.prototype.borderColor = '#2094f3';
  fabric.Image.prototype.cornerStrokeColor = '#2094f3';

  function deleteObject(eventData: any, transform: any) {
    var target = transform.target;
    var canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();

    return true;
  }
}
