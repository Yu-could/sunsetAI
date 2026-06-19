
import os

files = {
    'src/App.vue': open('src/App.vue.template').read(),
    'src/views/Home.vue': open('src/views/Home.vue.template').read(),
    'src/views/Memories.vue': open('src/views/Memories.vue.template').read(),
    'src/views/Diet.vue': open('src/views/Diet.vue.template').read(),
    'src/views/Safety.vue': open('src/views/Safety.vue.template').read(),
    'src/views/Family.vue': open('src/views/Family.vue.template').read()
}

for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Created: {path}')

print('All done!')
