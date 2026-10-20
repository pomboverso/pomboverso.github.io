import { getPrefix } from './_helpers.js'

const data = {
  title: "NixOS Configuration",
  description: `Just a bunch of things that I think make sense to share about how I keep my configuration organized. Most of these things probably would look better in separate files, but for now I'm enjoying having only one file where I can edit everything.`,
  article: [
    {
      title: 'Package Organization',
      p: [
        ''
      ],
    }
  ]
}

customElements.define(
  getPrefix('desktop'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #initialized = false

    #currentList = []

    #template = `
    <ul>
      <h2>NixOS Configuration</h2>
      <blockquote>Just a bunch of things that I think make sense to share about how I keep my configuration organized. Most of these things probably would look better in separate files, but for now I'm enjoying having only one file where I can edit everything.</blockquote>
      
      <article>
        <h3>Package Organization</h3>
        <p>I used to have one long list of packages. Now I can create smaller groups and remember why I installed things in the first place. This also helps me avoid having a million comments explaining why every package is there.</p>
        <p>For example, if I install several dependencies for something like AndroidDevelopment and later remove it, I know exactly which group I can remove entirely.</p>
        <code>
          packages = {
            development = with pkgs; [
              ...
            ];

            developmentRust = with pkgs; [
              ...
            ];

            developmentAndroid = with pkgs; [
              ...
            ];

            developmentAndroidSamsung = with pkgs; [
              ...
            ];
          };
        </code>
      </article>

      <article>
        <h3>Loops</h3>
        <p>Being able to create repetitive structures in the configuration is such a time saver. I used to manually define a few keybindings for switching between workspaces, but now I only need this:</p>
        <code>
          workspaces = builtins.genList (n: toString (n + 1)) 9;

          workspaceBindings = builtins.concatStringsSep \"\n\" (
            map (n: ''
              bindsym $mod+$ {n} workspace number $ {n}
              bindsym $mod+Shift+$ {n} move container to workspace number $ {n}
            '') workspaces
          );
        </code>
      </article>
    </ul>
    `

    connectedCallback() {
      if (this.#initialized) return
      this.#initialized = true

      this.innerHTML = this.#template
    }
  }
)
