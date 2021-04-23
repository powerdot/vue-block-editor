<template>
	<div :class="{container: true, [layout]: true}">
		<div :class="{blocks: true, [layout]: true}" v-if="layout_options.menu">
            <draggable
                class='dragArea list-group'
                :list="[block]"
                draggable=".item"
                :group="{ name: 'block_editor', pull: 'clone', put: false }"
                :clone="cloneBlockProto"
                :move="moveBlock"
                v-for="block in availableBlocks" :key="block.tag"
            >
                <div :class="{block:true, active: block.active, [`slot-draggable-${block.tag}`]: true, item: true}">
                    {{block.name}}
                </div>
            </draggable>
            <button @click='Compile'>Compile!</button>
		</div>
		<div :class="{editor: true, [layout]: true, mainEditor: isThisMainEditor, blockEditorSelected: blockEditorSelected}" v-if="layout_options.editor" @click="editorClick">
            <template v-if='layout_options.history'>
                <div class='history'>
                    <button class='history_button undo' @click='HistoryUndo'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                    </button>
                    <button class='history_button redo' @click='HistoryRedo'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"/>
                        </svg>
                    </button>
                    <span style="margin-left: 10px; font-size: 10pt; position: relative; top: -2px; opacity: 0.5;">Step: {{history.step==null?"last":history.step}}/{{history.compiled.length}}</span>
                </div>
            </template>
            <draggable 
                :class="['dragArea', 'list-group', ...draggableClasses]"
                v-model="editor" 
                draggable=".item"
                :group="'block_editor'"
                @start="BlockDragStart"
                @end="BlockDragEnd"
                @add="BlockDragAdded"
                ghost-class="ghost"
                :touchStartThreshold="20"
                :move="moveBlock"
            >
                <div :class='["item", "slot-draggable-"+block.tag]' v-for='(block, block_i) of editor' :key="block.id" :tag="block.tag" :block_id="block.id" @click="SlotClick(block, $event)">
                    <add-block :newBlockIndex="block_i" :availableBlocks="availableBlocks" @addBlock="modalMenuAddBlock" :copyBuffer="mainEditor().copyBuffer" @pasteBlocks="pasteBlocks" :editorTags="activeTags"></add-block>
                    <div :class="{block:true, selected: block.selected}" :id='block.id'>
                        <SlotRender :ref="block.id" :tag="block.tag" :block_id="block.id" @slotMounted="slotMounted">
                            <slot></slot>
                        </SlotRender>
                    </div>
                    <div :class="{removeBlock: true}" @click="removeBlockFromEditor($event,block)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                    <div :class="{copyBlock: true}" @click="copyBlock($event,block)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                        </svg>
                    </div>
                </div>
                <add-block :availableBlocks="availableBlocks" @addBlock="modalMenuAddBlock" :first="editor.length==0" :copyBuffer="mainEditor().copyBuffer" @pasteBlocks="pasteBlocks" :editorTags="activeTags"></add-block>
            </draggable>
            <!-- <div style='position: absolute; font-size: 8pt;'>{{editor}}</div> -->
		</div>
        
        <div class="propedit">
            <template v-if='selectedBlock'>
                <SlotRender 
                    :key="'render_prop_'+selectedBlock.id" 
                    :ref="'render_prop'+selectedBlock.id" 
                    :tag="selectedBlock.tag" 
                    :block_id="selectedBlock.id"
                    :dataRef="selectedBlock.ref"
                >
                    <slot></slot>
                </SlotRender>
            </template>
        </div>
	</div>
</template>

<script>

function countSlotsFromProtoObject(data){ 
    let counter = 0;
    if(typeof data == 'object'){
        if(Array.isArray(data)) {
            data.map(el => counter += countSlotsFromProtoObject(el))
        }else{
            for(let key of Object.keys(data)){
                let el = data[key];
                if(key=='block_editor' || key=='data'){
                    if(key=='block_editor') counter++;
                    counter += countSlotsFromProtoObject(el);
                }
            }
        }
    }
    return counter
}

function parseIncludesExcludes(includes, excludes){
    
}

let errorTypes = ['propertyEditorTemplateError', 'templateError'];

import SlotRender from './SlotRender.js';
import draggable from 'vuedraggable'
import clickOutside from './click_outside'
import addBlock from './addBlock'

export default {
	name: 'block-editor',
	components: {
        SlotRender,
        draggable,
        addBlock
	},
    directives: {
        clickOutside
    },
    props: {
        layout: { // Layout редактора
            type: String,
            default: 'full'
        },
        historyLength: { // Длина массива для хранения историй
            type: Number,
            default: 14
        },
        values: { // Массив данных при инициализации
            type: Array,
            default: ()=>([])
        },
        blocksInclude: { // Какие блоки включать в редактор
            type: Array,
            default: ()=>([])
        },
        blocksExclude: { // Какие блоки исключать из редактора
            type: Array,
            default: ()=>([])
        }
    },
	data: ()=>{
		return {
            availableBlocks: [], // array - массив всех доступных блоков
			editor: [], // array - массив блоков на странице
            slotsMounted: 0, // number - количество замаунченных блоков
            slotsMustBeMounted: 0, // number - количество блоков, которые необходимо замаунитить
            layout_options: { // свойства лейаута
                menu: false, // отображение меню
                editor: false, // отображение редактора
                history : false, // отображение элементов истории
            },
            selectedBlock: null, // объект выбранного блока, хранящийся в main editor, используется дл отображения попап пропов
            _cachedMainEditor: null, // кеш хранения ссылки на объект главного редактора
            selectBlockAfterMount: [], // массив блоков, которые нужно Select(), после маунта их слота
            setDataToBlockAfterMount: [], // массив блоков, которым нужно setData(), после маунта их слота
            copyBuffer: [], // массив скопированных элеентов, хранящийся в main editor
            registeredEditors: [], // массив всех эдиторов, хранящийся в main editor
            errorTypes, // массив тегов, определяющих слоты ошибок, которые нельзя использовать для отобржения в блоках
            draggableClasses: [], // для Draggable - определение классов блоков, которые можно перетаскивать в этот редактор
            activeTags: [], // массив тегов доступных в меню (+) для этого редактора
            isThisMainEditor: null, // кеш хранения являетлся ли этот редактор главным
            history: {
                compiled: [], // массив предыдущих компиляций
                step: null // i шага в истории
            },
            blockEditorSelected: false, // bool - определение выделен ли этот редактор
		}
	},
	methods: {
        moveBlock(e){
            let to_classes = [...e.to.classList];
            let el_class = [...e.dragged.classList].filter(x=>x.includes('slot-draggable'))[0]
            let can_place = to_classes.includes(el_class);
            return can_place;
        },
        
        modalMenuAddBlock(block, block_i){
            let new_block = this.addBlockToEditor(block, block_i, true);
            this.selectBlockAfterMount.push(new_block);
            //
        },
        
        slotMounted(slot_data){
            // console.log(`slotMounted to: ${this.isThisEditorIsMain()?'main':'child'}`, slot_data)
            for(let block of this.selectBlockAfterMount){
                if(block.id == slot_data.block_id){
                    this.SlotClick(block);
                    this.selectBlockAfterMount = this.selectBlockAfterMount.filter(x=>x.id!=block.id);
                }
            }
            for(let block of this.setDataToBlockAfterMount){
                if(block.id == slot_data.block_id){
                    this.$refs[block.id][0].setData(block.data);
                    this.setDataToBlockAfterMount = this.setDataToBlockAfterMount.filter(x=>x.id!=block.id);
                }
            }
            if(!this.isThisEditorIsMain()){
                this.mainEditor().slotMounted(slot_data);
            }else{
                this.slotsMounted++;
                // console.log("slots mounted:", this.slotsMounted+"/"+this.slotsMustBeMounted);
                if(this.slotsMustBeMounted == this.slotsMounted){
                    this.Imported();
                }
            }
        },

		addBlockToEditor(block, block_i, is_user_event=false){
			let block_proto = JSON.parse(JSON.stringify(block));
            block_proto.id = block_proto.id||this.parseID(block_proto);
            delete block_proto.data;
            block_proto.selected = false;
            if(typeof block_i != 'undefined'){
                this.editor.splice(block_i, 0, block_proto);
            }else{
                this.editor.push(block_proto);
            }
            this.mainEditor().editorChanged(is_user_event); 
            return block_proto;
		},

        /**
         * Метод удаления блока из редактора с анселектом всех блоков
         */
        removeBlockFromEditor(e,block){
            this.editor = this.editor.filter(x=>x.id!=block.id);
            this.mainEditor().setSelectedBlock(null);
            this.mainEditor().unselectInBlockEditor(false, true, true);
            this.mainEditor().editorChanged(true);
            e.stopPropagation();
        },

        /**
         * Метод копирования блока: получение его данных, добавление в буффер
         */
        copyBlock(e,block){
            let copied_block_structure = JSON.parse(JSON.stringify(this.editor)).find(x=>x.id==block.id);
            delete copied_block_structure.selected;
            delete copied_block_structure.id;
            copied_block_structure.data = this.$refs[block.id][0].getData();
            this.mainEditor().addToCopyBuffer(copied_block_structure)
        },

        /**
         * Метод для обновления списка скопированных элементов (вызывается только под main-редактором)
         */
        addToCopyBuffer(copied_block){
            this.copyBuffer = [];
            this.copyBuffer.push(copied_block);
            this.$forceUpdate();
        },

        /**
         * Метод вставки блоков
         */
        pasteBlocks(copyBuffer, newBlockIndex){
            console.log('pasteBlocks', this.$el, copyBuffer, newBlockIndex)
            let index_correction = 0;
            for(let b of copyBuffer){
                let added;
                if(typeof newBlockIndex != 'undefined'){
                    added = this.addBlockToEditor(b, newBlockIndex+index_correction, true);
                }else{
                    added = this.addBlockToEditor(b, undefined, true);
                }
                this.selectBlockAfterMount.push(added);
                this.setDataToBlockAfterMount.push({...added, data: b.data});
                index_correction++;
            }
        },

        /**
         * Копирование прототипа блока с присваиванием ему уникального id
         */
        cloneBlockProto(block){
            let block_proto = JSON.parse(JSON.stringify(block));
            block_proto.id = this.parseID(block_proto);
            return block_proto;
        },

        /**
         * Получение id блока (sting) от его proto_id или рандомный
         */
        parseID(block){
            if(!block.proto_id) return Math.floor(Math.random()*99999999).toString();
            return block.proto_id.replace(/rnd/g, Math.floor(Math.random()*99999999).toString());
        },

        /**
         * Внешний и внутренний метод для компиляции данных конкретного редактора
         * @param do_emit Вызывает cb-emit "Compiled" при успешной компиляции
         */
        Compile(do_emit=true){
            let blocks = JSON.parse(JSON.stringify(this.editor));
            for(let b of blocks){
                delete b.selected;
                // console.log('Compiler block',b, this.$refs[b.id][0])
                b.data = this.$refs[b.id][0].getData();
            }
            if(do_emit) this.$emit('Compiled', blocks);
            return blocks;
        },

        /**
         * Создание блоков внутри конкретного редактора исходя из JSON-схемы
         */
        _setData(d){
            this.editor = [];
            for(let block of d) this.addBlockToEditor(block);
            this.$nextTick(()=>{
                for(let block of d){
                    if(!this.editor.find(x=>x.id==block.id)) continue;
                    this.$refs[block.id][0].setData(block.data);
                }
            })
        },

        /**
         * Внешний и внутренний метод для импорта данных (можно вызвать как из внешнего скоупа, так и вызывается при mounted с values пропами)
         */
        importData(d){
            this.slotsMounted = 0;
            this.slotsMustBeMounted = countSlotsFromProtoObject(d) + d.length;
            this._setData(d);
        },

        /**
         * Метод создаюший cb-emit "Imported" при успешном импорте новых данных
         */
        Imported(){
            this.$emit('Imported');
            this.history.compiled.push(this.Compile(false));
        },

        /**
         * Метод при триггере на начало перемещения блока в Draggable - сохраняет его данные в глобальном буфере
         */
        BlockDragStart(e){
            let block_id = e.item.children[1].id;
            let block = this.$refs[block_id][0];
            let data = block.getData();
            window[`tempDragDataBlockEditor_${this.mainEditor()._uid}`][block_id] = data;
        },

        /**
         * Метод при триггере на конец добавления блока в Draggable - делает блок выделенным
         */ 
        BlockDragEnd(e){
            let children = e.to.children[e.newDraggableIndex].children[1];
            let block_id = children.id;
            let block_to_select = this.editor.find(x=>x.id==block_id);
            if(block_to_select) {
                this.SlotClick(block_to_select);
                this.mainEditor().editorChanged(true);
            }
        },

        /**
         * Метод при триггере на добавление блока в Draggable - добавляет блок и применяет к нему информацию из глобального буфера
         */
        BlockDragAdded(e){
            let children = e.to.children[e.newDraggableIndex].children[1];
            let block_id = children.id;
            if(window[`tempDragDataBlockEditor_${this.mainEditor()._uid}`]){
                let data = window[`tempDragDataBlockEditor_${this.mainEditor()._uid}`][block_id];
                if(data){
                    let block = this.$refs[block_id][0];
                    block.setData(data);
                    window[`tempDragDataBlockEditor_${this.mainEditor()._uid}`][block_id] = {};
                }
            }
            let block_to_select = this.editor.find(x=>x.id==block_id);
            block_to_select.selected = false;
            if(block_to_select) this.SlotClick(block_to_select);
            this.mainEditor().editorChanged(true);
        },

        /**
         * Функция обработки клика на слот
         */
        SlotClick(block, event, force){
            if(block.selected) {
                if(event) event.stopPropagation();
                return;
            }
            // console.log("Slot click!");
            this.mainEditor().setSelectedBlock(null);
            this.$nextTick(()=>{
                this.mainEditor().setSelectedBlock({ref: this.$refs[block.id],...block});
                this.unselectInBlockEditor(true);
                block.selected = true;
                this.setAvailableBlocks([], true);
            })
            if(event) event.stopPropagation();
        },

        /**
         * Установка доступных блоков для конкретного редактора (в том числе и draggable-классы и для меню (+))
         */
        setAvailableBlocks(available_blocks=[], onUserEvent=false){
            // console.log("setAvailableBlocks", this.isThisEditorIsMain()?"main":"child",available_blocks.length==0?"":"via argument")
            let availableBlocks = [];
            if(available_blocks.length == 0){
                let slots_collection = this.mainEditor().registeredEditors.map(x=>x.$slots?.default).flat().filter(x=>!errorTypes.includes(x?.tag));
                let all_slots = [];
                for(let s of slots_collection){
                    if(!s) continue;
                    if(all_slots.find(x=>(x?.componentOptions?x?.componentOptions?.tag:x.asyncMeta?.tag)==(s?.componentOptions?s?.componentOptions?.tag:s?.asyncMeta?.tag))) continue;
                    all_slots.push(s);
                }

                // определение блоков, доступных редактору исходя из параметров blocksInclude и blocksExclude
                if(this.blocksInclude.length == 0 && this.blocksExclude.length == 0){
                    // all available
                    for(let slot of all_slots){
                        let attrs = slot.data?slot.data.attrs:slot.asyncMeta.data.attrs;
                        let tag = slot.componentOptions?slot.componentOptions.tag:slot.asyncMeta.tag;
                        availableBlocks.push({
                            name: attrs.name,
                            proto_id: attrs.proto_id,
                            tag,
                            active: true
                        })
                    }
                }else{
                    if(this.blocksInclude.length == 0 && this.blocksExclude.length != 0){
                        // all available, but not excluded
                        for(let slot of all_slots){
                            let attrs = slot.data?slot.data.attrs:slot.asyncMeta.data.attrs;
                            let tag = slot.componentOptions?slot.componentOptions.tag:slot.asyncMeta.tag;
                            availableBlocks.push({
                                name: attrs.name,
                                proto_id: attrs.proto_id,
                                tag,
                                active: !this.blocksExclude.includes(tag)
                            })
                        }
                    }
                    if(this.blocksInclude.length != 0 && this.blocksExclude.length == 0){
                        // available only included
                        for(let slot of all_slots){
                            let attrs = slot.data?slot.data.attrs:slot.asyncMeta.data.attrs;
                            let tag = slot.componentOptions?slot.componentOptions.tag:slot.asyncMeta.tag;
                            availableBlocks.push({
                                name: attrs.name,
                                proto_id: attrs.proto_id,
                                tag,
                                active: this.blocksExclude.includes(tag)
                            })
                        }
                    }
                    if(this.blocksInclude.length != 0 && this.blocksExclude.length != 0){
                        // available only included, but not excluded
                        for(let slot of all_slots){
                            let attrs = slot.data?slot.data.attrs:slot.asyncMeta.data.attrs;
                            let tag = slot.componentOptions?slot.componentOptions.tag:slot.asyncMeta.tag;
                            availableBlocks.push({
                                name: attrs.name,
                                proto_id: attrs.proto_id,
                                tag,
                                active: this.blocksExclude.includes(tag) && !this.blocksExclude.includes(tag)
                            })
                        }
                    }
                }
            }else{
                availableBlocks = available_blocks;
            }
            this.availableBlocks = availableBlocks;

            // устанвливаем классы для перемещения блоков
            if(this.draggableClasses.length == 0) this.draggableClasses = availableBlocks.filter(x=>x.active).map(x=>'slot-draggable-'+x.tag);
            // устанавливаем классы доступные в меню (+)
            if(this.activeTags.length == 0) this.activeTags = availableBlocks.filter(x=>x.active).map(x=>x.tag);

            // устанавливаем в главный редактор доступные блоки в область меню
            // - в случае если эвент делает child редактор
            // - в случае, если на вход агументом не переданы блоки для установки (-рекурсия)
            // - в случае, если вызов функции был справоцирован event'ом
            if(!this.isThisEditorIsMain() && available_blocks.length == 0 && onUserEvent) this.mainEditor().setAvailableBlocks(availableBlocks);
            this.$forceUpdate();
        },

        /**
         * Функция обработки клика на editor (его пустое пространство)
         */
        editorClick(event){
            // console.log("Editor Click!", this.isThisEditorIsMain()?"main":"child")
            this.unselectInBlockEditor(false, true, true);
            this.blockEditorSelected = true;
            this.mainEditor().setSelectedBlock(null);
            this.setAvailableBlocks([], true)
            if(event) return event.stopPropagation();
        },

        /**
         * 
         */
        unselectInBlockEditor(user_event=false, from_main_editor=false, force_to_down=false){
            this.blockEditorSelected = false;
            for(let b of this.editor){
                if(b.selected) b.selected = false;
            }
            this.$forceUpdate();
            if(user_event || force_to_down){
                this.mainEditor().unselectAllChildren(user_event, this.isThisEditorIsMain());
            }
        },

        /**
         * Установка пропс попап у главного редактора (все запросы отправляются в mainEditor.setSelectedBlock), не используется в child-редакторах
         */
        setSelectedBlock(block){
            this.selectedBlock = block;
        },

        /**
         * 
         */
        unselectAllChildren(user_event=false, from_main_editor){
            if(from_main_editor != this.isThisEditorIsMain()) this.unselectInBlockEditor(false, from_main_editor);
            for(let block of this.editor) {
                if(!this.$refs[block.id]) continue;
                this.$refs[block.id][0].unselectAllChildren(false, true);
            }
            this.$forceUpdate();
        },

        /**
         * Получение экземпляра главного редактора
         */
        mainEditor(){
            if(this._cachedMainEditor) return this._cachedMainEditor;
            let all_parent_blocks = [];
            let current_parent = this.$parent;
            for(;;){
                if(!current_parent.$vnode) break;
                if(current_parent.$vnode.componentOptions.Ctor.extendOptions.name == 'block-editor') all_parent_blocks.push(current_parent);
                if(!current_parent.$parent) break;
                current_parent = current_parent.$parent;
            }
            let main_editor = all_parent_blocks.slice(-1)[0];
            if(!main_editor) main_editor = this;
            this._cachedMainEditor = main_editor;
            return main_editor;
        },

        /**
         * Метод регистрации редактора в массиве всех редакторов главного редактора
         */
        registerEditor(editor){
            this.registeredEditors.push(editor);
            // console.log('RegisterEditor', this.registeredEditors);
        },

        /**
         * Метод определения: является ли этот редактор главным
         */
        isThisEditorIsMain(){
            if(this.isThisMainEditor != null) return this.isThisMainEditor;
            let is = false;
            if(this._uid == this.mainEditor()._uid) is = true;
            this.isThisMainEditor = is;
            return is;
        },

        /**
         * Метод для тригеров любого изменения редактора
         */
        editorChanged(is_user_event){
            if(!is_user_event) return;
            this.$nextTick(()=>{
                this.$emit('Changed');
                // console.time("compiling")
                // let compiled = this.Compile(true);
                // console.timeEnd("compiling")
                this.history.compiled.push(this.Compile(false));
                this.history.compiled = this.history.compiled.slice(-this.historyLength);
                this.history.step = null;
                // console.log("editorChanged!", this.history.compiled)
                console.log("editorChanged!", this.history.compiled)
            })
        },

        /**
         * Метод возврата к предыдущему действию
         */
        HistoryUndo(){
            if(this.history.current_parenttep == null){
                this.history.step = this.history.compiled.length - 2;
            }else{
                this.history.step = this.history.step - 1;
            }
            if(this.history.step<0) return;
            this._setData(this.history.compiled[this.history.step]);
        },

        /**
         * Метод возврата от возврата
         */
        HistoryRedo(){
            if(this.history.step == null) return; 
            this.history.step = this.history.compiled.length - 1;
            if(this.history.step == null){
                this._setData(this.history.compiled[this.history.compiled.slice(-1)]);
            }else{
                this._setData(this.history.compiled[this.history.step]);
            }
            this.history.step = null;
        }
	},
    mounted(){
        // создание глобального буфера обмена редактора и отображение в нем возможности истории
        if(this.isThisEditorIsMain()){
            if(!window[`tempDragDataBlockEditor_${this._uid}`]) window[`tempDragDataBlockEditor_${this._uid}`] = {};
            this.layout_options.history = true;
        }

        // определение параметров UI отсносительно названия layout'a
        if(this.layout == "full"){
            this.layout_options.menu = true;
            this.layout_options.editor = true;
        }else if(this.layout == "editor-only"){
            this.layout_options.menu = false;
            this.layout_options.editor = true;
        }

        // установка данных, указанных при инициализации в пропе values
        if(this.values.length != 0){
            this.importData(this.values);
        }else{
            this.history.compiled.push([]);
        }

        // регистрация editor'а
        this.mainEditor().registerEditor(this);

        // установка в editor'e доступных ему блоков (draggable-классов и )
        this.setAvailableBlocks()
    }
}
</script>

<style lang="stylus" scoped>
.container{
	display: grid;
	grid-template-columns: 2fr 8fr 2fr;

    &.editor-only{
        grid-template-columns: 12fr;
    }

    .blocks{
        .block{
            cursor all-scroll;
            padding: 5px 10px;
            margin: 5px;
            background: #f3f3f3;
            border-radius: 5px;
            opacity: 0.5;
            &.active{
                opacity: 1;
            }
            &:hover{
                background: #d8d8d8;
            }
        }
    }

    .editor{
        background #eee;
        height 100vh;
        white-space pre-wrap;
        border: 1px solid white;
        &.blockEditorSelected{
            border: 1px solid blue;
        }
        &.mainEditor{
            padding: 10px;
        }
        .history{
            .history_button{
                border: none;
                background: rgba(0,0,0,0);
                outline: none;
                opacity: 0.7;
                cursor: pointer;
                &:hover{
                    opacity: 1;
                }
            }
        }
        .item{
            position: relative;
            .removeBlock{
                opacity: 0.2;
                position: absolute;
                cursor pointer;
                top: 9px;
                right: 15px;
                transition: 0.3s all;
            }
            .copyBlock{
                opacity: 0.2;
                position: absolute;
                cursor pointer;
                top: 9px;
                right: 35px;
                transition: 0.3s all;
                .bi-clipboard{
                    transform: scale(0.8);
                }
            }
            &:hover{
                .removeBlock{
                    opacity: 0.5;
                }
                .copyBlock{
                    opacity: 0.5;
                }
            }
            .removeBlock{
                &:hover{
                    opacity: 1;
                }
            }
            .copyBlock{
                &:hover{
                    opacity: 1;
                }
            }
        }

        .block{
            margin 2px 10px;
            background white;
            // cursor pointer;
            padding: 5px;
            border: 1px solid white;
            &.selected{
                border: 1px solid blue;
            }
        }

        .dragArea{
            height: 100%;
        }
    }

    &.editor-only{
        grid-template-columns: auto;
        .editor{
            height auto;
            min-height: 50px;
        }
    }
}






</style>

<style lang="stylus">
.editor .item.ghost .property_popup{
    display: none;
}

</style>
