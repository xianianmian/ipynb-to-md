import nbformat
import sys

def convert(ipynb_path, output_path):
    """Convert .ipynb file to Markdown format."""
    try:
        nb = nbformat.read(ipynb_path, as_version=4)
        lines = []

        for cell in nb.cells:
            if cell.cell_type == 'markdown':
                lines.append(cell.source + '\n')
            elif cell.cell_type == 'code':
                lines.append('```python\n' + cell.source + '\n```\n')
                if hasattr(cell, 'outputs') and cell.outputs:
                    for output in cell.outputs:
                        if output.output_type == 'stream' and output.name == 'stdout':
                            lines.append('**Output:**\n```\n' + output.text + '\n```\n')
                        elif output.output_type == 'execute_result' and 'data' in output:
                            if 'text/plain' in output['data']:
                                lines.append('**Output:**\n```\n' + output['data']['text/plain'] + '\n```\n')

        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(''.join(lines))

        print('Conversion successful')
        return True
    except Exception as e:
        print(f'Conversion failed: {str(e)}')
        return False

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print('Usage: python convert.py <input_ipynb> <output_md>')
        sys.exit(1)
    convert(sys.argv[1], sys.argv[2])
