/**
 * @file
 *
 * CKEditor plugin for Filestack picker.
 */
(function($, Drupal, CKEDITOR) {

  CKEDITOR.plugins.add('filestack', {
    icons: 'filestack',
    hidpi: true,

    init(editor) {
      editor.addCommand('filestack', {
        exec(editor) {
          // @todo change the name of the api key variable.
          const apikey = drupalSettings.editor.formats.basic_html.editorSettings.aaa_filestack_api_key;
          const client = filestack.init(apikey);
          const options = {
            maxFiles: 20,
            uploadInBackground: false,
            onOpen: () => console.log('opened!'),
            onUploadDone: (res) => console.log(res),
          };
          client.picker(options).open();
        }
      });

      // Register the toolbar button.
      if (editor.ui.addButton) {
        editor.ui.addButton('Filestack', {
          label: Drupal.t('Filestack'),
          command: 'filestack',
        });
      }
    },
  });

})(jQuery, Drupal, CKEDITOR);
