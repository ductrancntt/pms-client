import Vue from 'vue';
import { ValidationProvider } from 'vee-validate';
import RequiredLabel from '@/components/RequireLabel';
import SingleImageUploader from '@/components/SingleImageUploader';
import InputLabel from '@/components/InputLabel';
import OptionalLabel from "@/components/OptionalLabel";

Vue.component("RequiredLabel", RequiredLabel);
Vue.component("OptionalLabel", OptionalLabel);
Vue.component("SingleImageUploader", SingleImageUploader);
Vue.component("InputLabel", InputLabel);

Vue.component('ValidationProvider', ValidationProvider);
