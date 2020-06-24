import Vue from 'vue'
import {
    Button, Input, Row, Col, Message, Dropdown, MessageBox,
    DropdownMenu,
    DropdownItem,
    Tag,
    Icon,
    Form,
    FormItem,
    Menu,
    MenuItem,
    Steps,
    Step,
    Tabs,
    TabPane,
    Select,
    Option,
    Cascader,
    Table,
    TableColumn,
    Dialog,
    Pagination,
    InputNumber,
    DatePicker,
    Popover
} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(DatePicker)
Vue.use(InputNumber)
Vue.use(Popover)

Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
